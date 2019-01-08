---
title: "My Frequently Used Linux Commands"
date:   2019-01-06 20:30:00 +0200
tags:
    - Technical
    - Linux
---

This is my training wheels page for my frequently used Linux commands.
As I don't always remember the command or its syntax, I save it in my 
local notes storage. I've moved it here. 

If you have a useful command to contribute, I am eager to merge your 
pull request 😀

## Services

`bash±systemctl list-unit-files | grep enabled`

## What is using my port?

Let's say we are looking for anything on port `8002`. 
I am using this port to run my Gatsby website.

See what is listening on that port:

`bash±sudo netstat -tulpn | grep 8002`

`ss` is a utility to investigate sockets. You can get the pid for that 
socket which can be looked up and killed if necessary.

`bash±sudo ss -lptn 'sport = :8002'`