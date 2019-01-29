---
title: "A Service Has Gone Rogue. How Do I Manage It?"
date:   2019-01-08 06:46:00 +0200
tags:
    - Technical
    - Linux
    - Fedora
    - Cheat Sheet

---

Once I installed a development service on port **3000** and I forgot about it. When I ran my project I couldn't start it because the port
was in use. Baffled. :confused:

---

This post forms part of a sequence of command line references that I
will be writing where I forget the command or its syntax.

Although it is easily Google-able, there are usually a chain of
commands that I want kept together for ease of use.

The commands I use should be universal but just in case, **I am
running Fedora release 28 (Twenty Eight).**

> Also, if you want to contribute something interesting in any of
> my posts, please create a [pull-request](https://github.com/cbillowes/curious-programmer-helium) or write a
> comment below. :smile:

---

Getting back to my forgetfulness. I wanted to know what was using
that port. I'll get to that. First let's take a look at how I interrogate the system to get a list of running services.

`systemctl` let's us query or send control commands to the `systemd`
manager.`systemd` starts core programs, journal of system activity,
the network stack, a cron-style job scheduler, user logins and other
jobs. *Find out more at [ZDNet](https://www.zdnet.com/article/linus-torvalds-and-others-on-linuxs-systemd/)*.

If we want to find a list of installed programs and services (units)
that are enabled:

`bash±systemctl list-unit-files | grep enabled`

If we want to print out all services and see if they have been loaded
or not:

`bash±systemctl -l --type service --all`

## What service is hogging my port?

To get to the meat of the problem I interrogate the network, get a
pid and kill it. I can also uninstall the service if I no longer want
it to run.

`netstat` prints network connections, routing tables, interface statistics, masquerade connections, and multicast memberships.

When I run the below command, I can see the program name and pid

`bash±sudo netstat -tulpn | grep 3000`

Another command can be run using `ss` which is a utility to
investigate sockets.

`bash±sudo ss -lptn 'sport = :3000'`

## Just stop the service for now

```bash
sudo systemctl stop [servicename]
sudo systemctl disable [servicename]
```

## Killing processes

Once I have a pid for the process I want to shut down, I can kill it.
First I query the process to make doubly sure `bash±ps -aux | grep 12345`

Then I can kill it `bash±sudo kill 12345`. In some cases, the kill
doesn't want to play along in which case I need to force it,
`bash±sudo kill -9 12345`.

## Uninstall the service

If I am adamant that the service should not exist, I can uninstall it.

```bash
sudo systemctl stop [servicename]
sudo systemctl disable [servicename]
sudo rm /etc/systemd/system/[servicename]
sudo rm /etc/systemd/system/[servicename] #symlinks that might be related
sudo systemctl daemon-reload
sudo systemctl reset-failed
```

## Summary

```bash
systemctl list-unit-files | grep enabled
systemctl -l --type service --all
```

```bash
sudo netstat -tulpn | grep 3000
sudo ss -lptn 'sport = :3000'
```

```bash
ps -aux | grep 12345
sudo kill 12345
sudo kill -9 12345
```

```bash
systemctl stop [servicename]
systemctl disable [servicename]
rm /etc/systemd/system/[servicename]
rm /etc/systemd/system/[servicename]
systemctl daemon-reload
systemctl reset-failed
```

## References

* [Linus Torvalds and others on Linux's systemd](https://www.zdnet.com/article/linus-torvalds-and-others-on-linuxs-systemd/) - ZDNet
* [How to remove systemd services](https://superuser.com/questions/513159/how-to-remove-systemd-services) - superuser
