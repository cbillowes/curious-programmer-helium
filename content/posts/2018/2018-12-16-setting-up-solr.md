---
title: "Setting up Solr on Nginx with Let's Encrypt"
date:   2018-12-16 08:30:00 +0200
tags:
    - Technical
    - Solr
    - Nginx
    - Let's Encrypt
---

I want to enable search on my blog. I started looking into different solutions. I started with
ElasticSearch but came across too many issues to get it setup that I paused on that and moved on
to Solr. I fully intend on working with ElasticSearch and Kibana soon.

Setting up Solr comes with its own set of challenges, some blatantly obvious mistakes that I made
and others that required a little bit of digging.

> I configured my solution on a virtual server running Fedora 25.

## Install Solr

> Solr is an open source enterprise search platform, written in Java, from the Apache Lucene project.
> Its major features include full-text search, hit highlighting, faceted search, real-time indexing,
> dynamic clustering, database integration, NoSQL features and rich document handling.

### Missing dependency
The [Solr installation guide](https://lucene.apache.org/solr/guide/7_0/taking-solr-to-production.html#taking-solr-to-production)
is quite straightforward but I got an error because of a missing dependency.

It wanted the `lsof` package which "lists open files". It can get a list of all open files and the processes
that opened them. `sudo dnf install lsof`

### Install package
I downloaded the package referenced in the installation guide using `curl`:

```bash
curl http://mirror.za.web4africa.net/apache/lucene/solr/7.6.0/solr-7.6.0-src.tgz -o solr-7.6.0-src.tgz

tar xzf solr-7.6.0.tgz solr-7.6.0/bin/install_solr_service.sh --strip-components=2

./install_solr_service.sh solr-7.6.0.tgz
```

The **solr** user will be created by the installation script which will own `/opt/solr` and `/var/solr`.
Once the script completes, Solr will be installed as a service and running in the background on your server on port `8983`.

```bash
sudo service solr status
```

### Open firewall
I temporarily opened port `8983` while I was working on the project. I had to open the port on my
server's firewall and through my hosting provider's firewall done through their admin interface.

First, I need to ensure that the firewall is enabled on my server:

```bash
sudo firewall-cmd --state
```

I need to add the Solr port to the firewall:

```bash
sudo firewall-cmd --zone=public --permanent --add-port=8983/tcp
```

Once I have made a change to the firewall, I need to reload it for the change to take effect:

```bash
sudo firewall-cmd --reload
```

Verify that my changes took effect:

```bash
sudo firewall-cmd --zone=public --list-ports
```

### Test connection
Open a browser and browse to http://localhost:8983/solr or `curl http://localhost:8983/solr`.
Test it remotely by accessing it with your public IP address.

### Reflection

My connections were timing out and I had double checked my configuration. After Googling, the obvious answer hit me: firewall.
I had made the changes but forgot to reload the firewall for the change to take effect.

## Add a Solr core

> A Solr Core is a running instance of a Lucene index that contains all the Solr configuration files required to use it.
> We need to create a Solr Core to perform operations like indexing and analyzing.
> A Solr application may contain one or multiple cores.

Using the `solr` user created during the installation, I
[create a new core](https://lucene.apache.org/solr/guide/7_0/installing-solr.html#create-a-core).

```bash
su solr
cd /opt/solr/bin
./solr create -c collection_name
```

See the core now available in the web interface ready to index some data: http://localhost:8983/solr/#/~cores/collection_name

**Side note:** You can delete a core using the delete command `./solr delete -c collection_name`

**Curve ball:** I received a warning about my
[ulimit settings](https://lucene.apache.org/solr/guide/7_3/taking-solr-to-production.html#file-handles-and-processes-ulimit-settings)

```bash
*** [WARN] *** Your open file limit is currently 1024.
 It should be set to 65000 to avoid operational disruption.
 If you no longer wish to see this warning, set SOLR_ULIMIT_CHECKS to false in your profile or solr.in.sh
 ```

I set it to the suggested amount. I am not sure if I did this correctly though.
```bash
ulimit -a
ulimit -n 65000
```

### Reflection
Don't be scared of creating, deleting and recreating things, especially in the beginning, while learning.
Break it, fix it, understand it, learn it.

## Scrape Solr

Solr needed some data and I found a really useful python
[tutorial](https://lucidworks.com/2013/06/13/indexing-web-sites-in-solr-with-python/) to create a crawler for my blog
which will be hosted on my Fedora server, a server not hosting my blog.

### Missing dependencies
While setting up I came across the following missing dependencies

> `sudo dnf install python-devel` :The libraries and header files needed for Python development

> `pip install twisted`: An extensible framework for Python programming, with special focus on
> event-based network programming and multiprotocol integration.

### Install Scrapy

Prepare to run Scrapy in a python virtualenv:

```bash
PROJECT_DIR=~/projects/scrapy
mkdir $PROJECT_DIR
cd $PROJECT_DIR
virtualenv scrapyenv
source scrapyenv/bin/activate
pip install scrapy
```

Create a Scrapy application:

```bash
scrapy startproject blog
cd blog
```

Edit `blog/items.py` to indicate what needs to be indexed:

```python
from scrapy.item import Item, Field

class BlogItem(Item):
    title = Field()
    url = Field()
    text = Field()
```

Create a spider to crawl my blog:

```python
from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector
from scrapy.http import Request
from blog.items import BlogItem
from scrapy.item import Item
from urlparse import urljoin
import re

class BlogSpider(BaseSpider):
    name = 'blog'
    allowed_domains = ['curiousprogrammer.io']
    start_urls = ['https://curiousprogrammer.io/']

    seen = set()

    def parse(self, response):
        if response.url in self.seen:
            self.log('already seen  %s' % response.url)
        else:
            self.log('parsing  %s' % response.url)
            self.seen.add(response.url)

        hxs = HtmlXPathSelector(response)
        if re.match(r'https://curiousprogrammer.io/blog/\S.*$', response.url):
            item = BlogItem()
            item['title'] = hxs.select('//title/text()').extract()
            item['url'] = response.url
            item['text'] = hxs.select('//div[@id="post"]//child::node()/text()').extract()
            self.log("yielding item " + response.url)
            yield item

        for url in hxs.select('//a/@href').extract():
            url = urljoin(response.url, url)
            if not url in self.seen and not re.search(r'.(pdf|zip|jar|gif|png|jpg)$', url):
                self.log("yielding request " + url)
                yield Request(url, callback=self.parse)
```

Crawl the blog. An `items.json` file is generated. It will be appended to each time a crawl is processed outputting to the same file.

```bash
scrapy crawl blog -o items.json -t json
```

The tutorial showcases a index python script using `pysolr` but it didn't work for me.
I indexed it directly through the Solr API using curl.

```bash
curl "http://localhost:8983/solr/collection_name/update/json/docs?commit=true" -H "Content-type:application/json" --data-binary @items.json
```

I set up a daily cronjob to index data using
[crontab](https://tecadmin.net/crontab-in-linux-with-20-examples-of-cron-schedule/)
through `vim ~/projects/scrapy/blog/crawl-and-index`:

```bash
#!/bin/bash

echo "Delete entries from Solr"
curl http://localhost:8983/solr/oxygen/update --data '<delete><query>*:*</query></delete>' -H 'Content-type:text/xml; charset=utf-8'
curl http://localhost:8983/solr/oxygen/update --data '<commit/>' -H 'Content-type:text/xml; charset=utf-8'

echo "Remove existing scraped database"
cd /root/projects/scrapy/blog
rm items.json

echo "Enter they scrapy virtualenv"
source ../scrapyenv/bin/activate

echo "Start crawling your blog..."
scrapy crawl blog -o items.json -t json

echo "Index Solr with crawled database"
curl "http://localhost:8983/solr/oxygen/update/json/docs?commit=true" -H "Content-type:application/json" --data-binary @items.json

echo "Bye!"
```

```bash
crontab -e
@daily ~/projects/scrapy/blog/crawl-and-index
```

## Setup your hosting environment
I no longer wanted to access the Solr API publically using the port. To achieve this, I had to configure a reverse
proxy. A great benefit to using this approach is the usage  of SSL. For me to get SSL to work, I had to start
by getting a domain name.

### Get a domain name

You can get a free domain name at [freenom](https://www.freenom.com) or other services that are available.

To release your inner geek, you can update your host's name:

```bash
sudo hostname new_host_name

sudo vim /etc/hostname
```

Update your `/etc/hosts` to look something as follows:

```bash
127.0.0.1    new_host_name
```

Add your nameservers that your domain registrar will provide to you:

```bash
vim /etc/resolv.conf

# Generated by NetworkManager
search new_host_name
nameserver <IP>
nameserver <IP>
nameserver 8.8.8.8 #Google
```

### Create a webserver with Nginx
> NGINX is a high-performance HTTP server and reverse proxy, as well as an
> IMAP/POP3 proxy server. NGINX is known for its high performance, stability,
> rich feature set, simple configuration, and low resource consumption.

```bash
sudo dnf install nginx
# Start NGINX when system boots
sudo systemctl enable nginx
# Start NGINX
sudo systemctl start nginx
# Check NGINX Status
sudo systemctl status nginx
```

### Create an SSL Certificate with Let's Encrypt

Install certbot, configure it and then create a cron job to automatically renew the certificate every twelve months

```bash
sudo dnf install certbot-nginx
crontab -e
0 12 * * * /usr/bin/certbot renew --quiet
```

### Redirects
Configure server on port 80 to redirect all traffic to SSL:
```nginx
server {
    listen       80 default_server;
    listen       [::]:80 default_server;
    server_name  *.example.com;
    root         /usr/share/nginx/html;

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    if ($scheme != "https") {
        return 301 https://$host$request_uri;
    }
}
```

Verify that port 443 is configured correctly:
Configure server on port 443:
```nginx
server {
    listen       443 ssl http2 default_server;
    listen       [::]:443 ssl http2 default_server;
    server_name  *.example.com;
    root         /usr/share/nginx/html;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    location / {
    }
}
```

Then add hosted applications underneath the last location statement. In this case I am directing
all incoming `/solr` traffic to `localhost:8983` so that I can run Solr on HTTPS.

```nginx
# This is our Solr instance
# We will access it through SSL instead of using the port directly
location /solr {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_pass "http://localhost:8983";
}

error_page 404 /404.html;
    location = /40x.html {
}

error_page 500 502 503 504 /50x.html;
    location = /50x.html {
}
```

Test this in a browser or by running a `curl` command. If connections time out, double check the
firewall rules, this time making sure 443 is open on host and hosting provider and that the firewall has been reloaded.

### Dropping access to ports
I no longer need to expose Solr's port so I can drop it from the firewall.

```bash
sudo firewall-cmd --zone=public --permanent --remove-port=8983/tcp
sudo firewall-cmd --reload
sudo firewall-cmd --zone=public --list-ports
```

## Consume the API
When ready to consume the API using a JavaScript application, it is highly likely that you encounter a
Cross-Origin Resource Sharing error when trying to make calls to the remote server. The reverse proxy and the
Solr application haven't been explicitly told to give you the resources you are requesting.

> [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
> is a mechanism that uses additional HTTP headers to
> tell a browser to let a web application running at one origin (domain) have permission to
> access selected resources from a server at a different origin. A web application makes a
> cross-origin HTTP request when it requests a resource that has a different origin (domain,
> protocol, and port) than its own origin.

The error goes along the lines of  <span class="serious-highlight">Access to XMLHttpRequest at 'https://example.com/solr/collection_name/select'
from origin 'http://localhost:8081' has been blocked by CORS policy: No 'Access-Control-Allow-Origin'
header is present on the requested resource.</span>

### Reverse proxy

To enable CORS on the reverse proxy we need to edit the `/etc/nginx/nginx.conf` file. In this example
I [configure Nginx CORS](https://gist.github.com/Stanback/7145487) to support the reverse proxied Solr API.

```nginx
location /solr {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_pass "http://localhost:8983";

    set $cors '';
    if ($http_origin ~ '^http(s)*?://(localhost|www\.curiousprogrammer\.io)') {
            set $cors 'true';
    }

    if ($cors = 'true') {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With' always;
            add_header 'Access-Control-Expose-Headers' 'Authorization' always;
    }

    if ($request_method = 'OPTIONS') {
            # Tell client that this pre-flight info is valid for 20 days
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            add_header 'Content-Length' 0;
            return 204;
    }
}
```

### Application layer
It can also be applied on the
[Solr application layer](https://opensourceconnections.com/blog/2015/03/26/going-cross-origin-with-solr/)
as it ships with the Jetty servlet engine.

```bash
cd /opt/solr/server/solr-webapp/webapp/WEB-INF/lib

curl "http://search.maven.org/remotecontent?filepath=org/eclipse/jetty/jetty-servlets/8.1.14.v20131031/jetty-servlets-8.1.14.v20131031.jar" -o jetty-servlets-8.1.14.v20131031.jar

curl "http://search.maven.org/remotecontent?filepath=org/eclipse/jetty/jetty-util/8.1.14.v20131031/jetty-util-8.1.14.v20131031.jar" -o jetty-util-8.1.14.v20131031.jar
```

Edit `server/solr-webapp/webapp/WEB-INF/web.xml`

```xml
 <filter>
   <filter-name>cross-origin</filter-name>
   <filter-class>org.eclipse.jetty.servlets.CrossOriginFilter</filter-class>
   <init-param>
     <param-name>allowedOrigins</param-name>
     <param-value>http://localhost:8081,https://curiousprogrammer.io</param-value>
   </init-param>
   <init-param>
     <param-name>allowedMethods</param-name>
     <param-value>GET,POST,OPTIONS,DELETE,PUT,HEAD</param-value>
   </init-param>
   <init-param>
     <param-name>allowedHeaders</param-name>
     <param-value>origin, content-type, accept</param-value>
   </init-param>
 </filter>

 <filter-mapping>
   <filter-name>cross-origin</filter-name>
   <url-pattern>/*</url-pattern>
 </filter-mapping>
 ```

## My final thoughts
This exercise took me a day and a half to figure out. It took me another day to make sense of it all to write about it.
I made a lot of silly mistakes that could have been avoided had I just taken a few extra breaks to clear my head.

When something goes wrong and I am highly uncertain about the technology, domain or intricacies of the problem,
it becomes extremely challenging to translate that into search terms. This is sometimes overwhelming.
The best advice I can give is to break down the problem as much as possible and unpack logically how each component
fits together and what could possibly be causing an issue. This could extract more useful search terms or actually
help solve the problem.

If it isn't that simple and you have error messages, copy them verbatim and read and re-read the errors and solutions
presented to you, even if some of them might not seem related. Something might stand out or spark a thought.

If you don't have error messages, spit ball with terms you do know that you are working with and problems you think
you may be experiencing.

Most importantly, **make notes of what you are doing.** You never know when you might need it again. You could also
just jot it down and blog about it to help you and others experiencing the same challenges that you are facing
regardless of how large or small.

---

With regards to Solr, it's early days. Looking back at the actual steps I had to take to install it, the setup and installation
is really simple. It was finding that information that was the tricky part for me because there is a lot of
information out there.

The blog crawler was an interesting find and I am glad that it is in Python because it's a language I feel worthwhile learning.
The crawler does a dandy job and exactly what I need it to do for now.

I enjoy working with Nginx as I am now accustomed to it and Let's Encrypt was fairly straightforward to configure
once the domain name was correctly configured.

Next is actually configuring this solution into a React component on my Gatsby website. A tale for another day.

## References

### Solr
* [Taking Solr to Production](https://lucene.apache.org/solr/guide/7_0/taking-solr-to-production.html#taking-solr-to-production)
* [Create a Core](https://lucene.apache.org/solr/guide/7_0/installing-solr.html#create-a-core)
* [File Handles and Processes (ulimit settings)](https://lucene.apache.org/solr/guide/7_3/taking-solr-to-production.html#file-handles-and-processes-ulimit-settings)
* [Going Cross-Origin with Solr](https://opensourceconnections.com/blog/2015/03/26/going-cross-origin-with-solr/)

### Scraping
* [Install Scrapy on Linux](https://blog.michaelyin.info/scrapy-tutorial-3-how-install-scrapy-linux/)
* [Scrapy installation guide](https://doc.scrapy.org/en/latest/intro/install.html)
* [Indexing websites in Solr with Python](https://lucidworks.com/2013/06/13/indexing-web-sites-in-solr-with-python/)
* [Crontab in Linux with 29 useful examples to schedule jobs](https://tecadmin.net/crontab-in-linux-with-20-examples-of-cron-schedule/)
* [StackOverflow: Match rest of string with regex](https://stackoverflow.com/questions/8959612/match-rest-of-string-with-regex)
* [Online regex tester and debugger: PHP, PCRE, Python, Golang and JavaScript](https://regex101.com/)

## Hosting
* [Find a new free domain with freenom](https://www.freenom.com)
* [Ubuntu Linux Change Hostname (computer name)](https://www.cyberciti.biz/faq/ubuntu-change-hostname-command/)
* [Nginx install](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/)
* [Install Nginx Web Server on Fedora](https://developer.fedoraproject.org/start/sw/web-app/nginx.html)
* [Getting started with Let's Encrypt](https://letsencrypt.org/getting-started/)
* [Install Let's Encrypt using certbot with nginx on Fedora](https://certbot.eff.org/lets-encrypt/fedora-nginx)
* [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
* [Example Nginx configuration for adding cross-origin resource sharing (CORS) support to reverse proxied APIs](https://gist.github.com/Stanback/7145487)
