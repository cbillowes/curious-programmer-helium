---
title: "Greet users with the message of the day"
date:   2019-02-15 05:00:00 +0200
tags:
    - Technical
    - Terminal
    - Linux
---

The message of the day is known as motd.  It's used to send a message
to users after logging into a shell, commonly used on hosts.

```bash
find / -name "motd" # if you forget where to locate the file
vim /etc/motd
```

You can generate [ASCII art](https://www.kammerl.de/ascii/AsciiSignature.php) and paste it into the motd file to spice things up.

```example
   __                  _                  __
  / /   ___ _   _ _ __(_) ___  _   _ ___  \ \
 | |   / __| | | | '__| |/ _ \| | | / __|  | |
< <   | (__| |_| | |  | | (_) | |_| \__ \   > >
 | |   \___|\__,_|_|  |_|\___/ \__,_|___/  | |
  \_\                                     /_/
```

I found that [patorjk.com](http://patorjk.com/software/taag/) offers a nice way to generate ascii art.
