---
title: "Migrage my search from Solr to Elasticsearch"
date:   2019-02-05 06:00:00 +0200
tags:
    - Technical
    - Terminal
    - Cheat sheet
    - Linux
---

An NRT (near-realtime) search platform. It's about a one second delay
from the time a document is indexed until it is searchable.

I have been using Solr for my search but have been wanting to migrate
to Elasticsearch for experience in this technology. This is my
cheat sheet to install the service on Fedora.

## Elasticsearch

### Install the service

> There are a lot of ways to install Elasticsearch and on many different
> platforms. Pick your [flavor](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html).

#### Public signing key
```bash
rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```

#### Install from repository
Create a file called `elasticsearch.repo` in the `/etc/yum.repos.d/` directory:
```bash
vim /etc/yum.repos.d/elasticsearch.repo
```

```repo
[elasticsearch-6.x]
name=Elasticsearch repository for 6.x packages
baseurl=https://artifacts.elastic.co/packages/6.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
```

```bash
sudo dnf install elasticsearch
```

### Run the service
```bash
sudo systemctl daemon-reload
sudo systemctl enable elasticsearch.service
```

```bash
systemctl start elasticsearch.service && systemctl status elasticsearch.service
```

Checking the status of the service is not good enough.
Check the logs in `/var/log/elasticsearch/`

The service can log information to `systemd` journal when you remove
the `--quite` option from the `ExecStart` variable in the `elasticsearch.service` file.

```bash
find / -name "elasticsearch.service"
vim /usr/lib/systemd/system/elasticsearch.service
```

```service
ExecStart=/usr/share/elasticsearch/bin/elasticsearch -p ${PID_DIR}/elasticsearch.pid
```

```bash
sudo journalctl -f
```

```bash
sudo journalctl --unit elasticsearch
```

```bash
sudo journalctl --unit elasticsearch --since  "2016-10-30 18:17:16"
```

### Verify it's running

```bash
curl -X GET "localhost:9200/"
```

```example
{
  "name" : "Cp8oag6",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "AT69_T_DTp-1qgIJlatQqA",
  "version" : {
    "number" : "6.6.0",
    "build_flavor" : "default",
    "build_type" : "zip",
    "build_hash" : "f27399d",
    "build_date" : "2016-03-30T09:51:41.449Z",
    "build_snapshot" : false,
    "lucene_version" : "7.6.0",
    "minimum_wire_compatibility_version" : "1.2.3",
    "minimum_index_compatibility_version" : "1.2.3"
  },
  "tagline" : "You Know, for Search"
}
```

## Kibana

```bash
rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```

```bash
vim /etc/yum.repos.d/kibana.repo
```

```repo
[kibana-6.x]
name=Kibana repository for 6.x packages
baseurl=https://artifacts.elastic.co/packages/6.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
```

```bash
sudo dnf install kibana
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable kibana.service
```

```bash
systemctl start kibana.service && systemctl status kibana.service
```

Logs at `/var/log/kibana/`

```bash
curl -X HEAD -I "http://localhost:5601/"
```

```example
HTTP/1.1 302 Found
location: /app/kibana
kbn-name: kibana
kbn-xpack-sig: b20f9c2acad91a2f8f5ab18dab784428
content-type: text/html; charset=utf-8
cache-control: no-cache
content-length: 0
connection: close
Date: Sun, 03 Feb 2019 07:28:09 GMT
```

```bash
curl -X GET "http://localhost:5601/app/kibana"
```

## Reverse Proxy
`/etc/kibana/kibana.yml`
```yml
# The URLs of the Elasticsearch instances to use for all your queries.
elasticsearch.hosts: ["http://localhost:9200"]

# Enables you to specify a path to mount Kibana at if you are running behind a proxy.
# Use the `server.rewriteBasePath` setting to tell Kibana if it should remove the basePath
# from requests it receives, and to prevent a deprecation warning at startup.
# This setting cannot end in a slash.
server.basePath: "/kibana"

# Specifies whether Kibana should rewrite requests that are prefixed with
# `server.basePath` or require that they are rewritten by your reverse proxy.
# This setting was effectively always `false` before Kibana 6.3 and will
# default to `true` starting in Kibana 7.0.
server.rewriteBasePath: false
```

`/etc/nginx/nginx.conf`

```nginx
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

    upstream elasticsearch {
	      server      localhost:9200;
	      keepalive   15;
    }

    upstream kibana {
	      server      localhost:5601;
	      keepalive   15;
    }

    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;
	      return       301 https://$host$request_uri;
    }

    # Settings for a TLS enabled server.
    server {
        listen       443 ssl http2;
        listen       [::]:443 ssl http2;
        server_name  awesome.sauce;
        root         /www/public/awesome.sauce;

        if ($http_user_agent ~
           (Baiduspider|Yandex|DirBuster|libwww|"")) {
            return 403;
        }

        add_header  Strict-Transport-Security "max-age=31536000";
        access_log   /var/log/nginx/ssl-access.log  combined;
        ssl_certificate /etc/letsencrypt/live/awesome.sauce/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/awesome.sauce/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
	      ssl_stapling 	    on;
	      ssl_stapling_verify on;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
	        root /www/public/awesome.sauce;
        }

        location = /nginx_status {
            stub_status  on;
            access_log   off;
            allow        100.200.100.200;
            deny         all;
        }

        location ~ ^/elastic/(.*)$ {
	        proxy_pass http://elasticsearch/$1;
            proxy_http_version 1.1;
            proxy_set_header Connection "Keep-Alive";
	        proxy_set_header Proxy-Connection "Keep-Alive";
	        sendfile_max_chunk 512k;
	        proxy_buffering off;
            limit_except GET {
                deny  all;
            }
        }

	      location ~ ^/kibana/(.*)$ {
            proxy_pass http://kibana/$1;
            proxy_http_version 1.1;
            proxy_set_header Connection "Keep-Alive";
            proxy_set_header Proxy-Connection "Keep-Alive";
            sendfile_max_chunk 512k;
            proxy_buffering on;
            limit_except GET {
                deny  all;
            }
        }
    }
}
```

## Index
Run on the server
```bash
curl -X PUT "localhost:9200/search" -H 'Content-Type: application/json' -d'
{
    "settings" : {
        "number_of_shards" : 1
    },
    "mappings" : {
        "_doc" : {
            "properties" : {
                "id" : { "type" : "text" },
                "url" : { "type" : "text" },
                "title" : { "type" : "text" },
                "post" : { "type" : "text" }
            }
        }
    }
}
'
```

Check out the index
```bash
curl -X GET "localhost:9200/search/_mapping/_doc"
```

Get rid of it?
```bash
curl -X DELETE "localhost:9200/search"
```


## References

* [Installing Elasticsearch with RPM](https://www.elastic.co/guide/en/elasticsearch/reference/current/rpm.html) - elastic
* [Install Kibana with RPM](https://www.elastic.co/guide/en/kibana/current/rpm.html) - elastic
* [ELK with Nginx Gist](https://gist.github.com/Dev-Dipesh/2ac30a8a01afb7f65b2192928a875aa1) - Dev-Dipesh @ GitHub
* [How can I install the htpasswd utility in Red Hat / Scientific Linux?](https://serverfault.com/questions/259505/how-can-i-install-the-htpasswd-utility-in-red-hat-scientific-linux) - ServerFault
* Learning Elastic Stack 6.0
By Pranav Shukla, Sharath Kumar
December 2017


https://www.elastic.co/guide/en/kibana/current/using-kibana-with-security.html
