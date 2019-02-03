---
title: "SSH for Days"
date:   2019-02-03 05:00:00 +0200
tags:
    - Technical
    - Linux
---

Mosh - the mobile shell. This remote terminal let's you roam
with intermittent connectivity without breaking your SSH tunnel.

The package must be installed on both the client and server and
does not need to be run as a super user.

> It replaces interactive SSH. Instant keystroke response, robust roaming
> but you'll need working UDP.

It supports intermittent connectivity:
* Put your computer to sleep, wake it up and your connection is alive.
* Leave your connection running and it won't break the pipe.
* Change between networks - Wi-Fi at the coffee shop, Ethernet at the
office, LTE at home - and you will stay logged in.

It provides intelligent local echo and line editing of user keystrokes.
You get an instant response to typing, deleting and line editing.

Mosh can run in xterm, gnome-terminal, urxvt, Terminal.app, iTerm, emacs
screen or tmux. It's mostly designed from scratch and supports **one character set: UTF-8**.

It's freely available on GNU/Linux, BSD, macOS, Solaris, Android, Chrome
and iOS.

Credits go to Keith Winstein, along with Anders Kaseorg, Quentin Smith,
Richard Tibbetts, Keegan McAllister, and John Hood who wrote Mosh.

## Installation
* [Install Mosh](https://mosh.org/#getting) on your platform.

## Usage
* Connect a user `mosh chewbacca.norad.mil`
  Mosh will log the user in via SSH, then start a connection on a UDP
  port between 60000 and 61000.

* Connect with a different username `mosh potus@ackbar.bls.gov`
* Connect with server binary outside path `mosh potus@ackbar.bls.gov`
  The user can specify an alternate path for the `mosh-server` on the
  remote host. The server binary can even be installed in the user's home
  directory.

* Select a Mosh UDP port `mosh -p 1234 darth`
  Useful when the server is behind a port-forwarder or NAT.

* Select an SSH port `mosh --ssh="ssh -p 2222" figrindan`
* Add other SSH options `mosh --ssh="~/bin/ssh -i ./identity" fett`
* Disable instant echo `mosh --predict=never niennunb`
  The `-n` switch is a synonym. By contrast, passing `--predict=always`
  or `-a` will enable instant local echo even on low-delay links.

* With a command `mosh pello -- screen -dr`
  This reattaches to a long-running screen session.

## Cheat sheet

### Firewall
Open the selected port between **60000** and **61000** if you have a
firewall. Open the range if you want Mosh to decide `-p 0`.
```bash
firewall-cmd --zone=public --permanent --add-port=60000/udp
firewall-cmd --reload
firewall-cmd --zone=public --list-ports
```

### Server connection
Start Mosh server on port **60000** enabling 256 colors for TERM on the
local interface `127.0.0.1` and print debugging information before
detaching.
```bash
mosh -v -i 127.0.0.1 -p 60000 -c 256
```

### Client connection
The unicorn. Connect to the server on port **60000** using a specific
user.
```bash
mosh -p 60000 user@awesome.sauce
```

## Ending the connection
Normally, logout or exit on the remote host will close the session. Mosh accepts the escape sequence `Ctrl-^ .` (typically typed with Control-Shift-6, then a period) to end the connection forcibly. To send a literal `Ctrl-^`, type `Ctrl-^ ^`.

## Man Pages
* mosh(1)
* mosh-client(1)
* mosh-server(1)

## References

* [Getting Mosh](https://mosh.org/#getting) - Mosh
* [Technical Info](https://mosh.org/#techinfo) - Mosh
