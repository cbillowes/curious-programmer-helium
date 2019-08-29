---
title: "Cisco ASA cheat sheet"
date:   2019-02-10 15:30:00 +0200
tags:
    - Technical
    - Terminal
    - Cisco
    - Cheat sheet
---

Cisco Adaptive Security Appliancy is known as the Cisco ASA. It
is used to protect networks and data centres.

It offers firewall, VPN and facilitates dynamic routing amongst other
features and capabilities.

It runs on Linux using a single Executable and Linkable Format program
called lina. Lina schedules processes and handles things like concurrency
internally rather than using the underlying Linux capabilities.

In this post I share a few of the CLI commands to query, operate
and configure the device.

## Access privelage EXEC mode
`ciscoasa` is the default hostname for the default ASA state. You will
see that you are in EXEC mode with the `ciscoasa>` prompt.

Type `enable` to access privilege EXEC mode. The default password is **blank**.
The prompt changes to `ciscoasa#`

## Lockdown access to ASA
`show` displays sensitive data and we don't want prying eyes to see that.

```cisco
enable password <PASSWORD>
show running-config enable
```

To verify the password works, we need to `exit` the modes.
`exit` config mode and then privilege EXEC.

## Create a local user account

The highest privilege is `15`

```cisco
username admin password cisco privilege 15
show running-config user
```

## Get more information about the system
`show version`

`show processes`

`show file system`

`show flash`

## Set a hostname
Change the hostname from the **global configuration mode**.

`configure terminal` or `config terminal` or `config t`

Notice the prompt becomes `ciscoasa(config)#`

Enter `hostname <HOSTNAME>` and your prompt will change to that name.

## Set the clock for logs and what-not
Timestamps are important for
logs. They help administrators understand the order of events.
`clock set hh:mm:ss {month day | day month} year`

```cisco
clock set 21:10:00 9 february 2019
show clock
```

## Assign a domain name

```cisco
domain-name ec2-1-2-3-4.compute-1.amazonaws.com
show running-config domain-name
```

## Show a banner

In your global configuration mode `oxygen(config)#` we can set banners.
Below we configure the **message of the day (MOTD)** banner.

```cisco
banner motd Please be advised unauthorized access is strictly prohibited
banner motd All access are recorded for security purposes
banner motd This device is the property for ACME Corp.
show banner
```

## Inside/Outside interfaces

oxygen(congif)# `show interface`
oxygen(config)# `interface management0/0`
oxygen(config-if)# `nameif Inside`
oxygen(config-if)# `security-level 100`
oxygen(config-if)# `ip address 192.168.2.1 255.255.255.0`
oxygen(config-if)# `nameif Inside`
oxygen(config-if)# `nameif Inside`


## References
* [](https://www.cisco.com/c/en/us/td/docs/security/asa/asa72/configuration/guide/conf_gd/intparam.pdf)
[Cisco ASA](https://en.wikipedia.org/wiki/Cisco_ASA) - Wikipedia
* [Cisco Adaptive Security Appliance (ASA) Software](https://www.cisco.com/c/en/us/products/security/adaptive-security-appliance-asa-software/index.html) - cisco.com
* [Cisco ASA series part one: Intro to the Cisco ASA](https://www.nccgroup.trust/au/about-us/newsroom-and-events/blogs/2017/september/cisco-asa-series-part-one-intro-to-the-cisco-asa/) - nccgroup
