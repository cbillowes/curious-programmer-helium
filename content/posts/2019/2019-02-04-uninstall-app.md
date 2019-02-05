---
title: "Uninstall an app from the terminal"
date:   2019-02-04 13:10:00 +0200
tags:
    - Technical
    - Linux
    - Terminal
---

I installed an application. It misbehaved.

I wanted to try out a time tracking app. It should let me track reminders and
record activity spent in meetings, out-of-office and on tasks I am working on, etc.

I need to be able to interact with it in the GUI but I couldn't. It appeared to
be running in the background but I couldn't find it in the processes.

When I wanted to uninstall it, it didn't list in Software. I tried to reinstall
it but, as expected, it moaned that the application was already installed. I didn't get an
option to uninstall it from that view.

Now I had an app that didn't run properly with a process I couldn't find and no
matter what I tried, I couldn't uninstall it. There had to be a way.

> I have **Fedora release 28 (Twenty Eight)** installed.

I was able to grep through my `dnf` packages and find the package I was looking
for using what I thought it's name should be.

```bash
dnf list | grep <the-possible-app-name>
```

I removed the app based on the actual package name in the `dnf` repository.

```bash
sudo dnf remove <package-name>
```

I thought something went wrong with the install so I tried it again but it didn't work so I
guess I can't run it on Fedora.

## References

* [How to Uninstall Software Using the Command Line in Linux](https://www.howtogeek.com/229699/how-to-uninstall-software-using-the-command-line-in-linux/)
