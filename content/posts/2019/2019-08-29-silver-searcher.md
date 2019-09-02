---
title: "The Silver Searcher"
date:   2019-08-29 05:10:00 +0200
tags:
    - Technical
    - Terminal
---

The `ack` utility was designed to replace 99% of the uses of grep.

As stated in the [man page](https://linux.die.net/man/1/ack)

> Ack searches the named input FILEs (or standard input if no files are named,
> or the file name - is given) for lines containing a match to the given
> PATTERN . By default, ack prints the matching lines.
> Ack can also list files that would be searched, without actually
> searching them, to let you take advantage of ack's file-type filtering
> capabilities.

[Silver Searcher](https://github.com/ggreer/the_silver_searcher) `ag` is similar
to `ack` with a focus on spead. Without `ack` `ag` would not exist.

## Installing

### macOS

    brew install the_silver_searcher

or

    port install the_silver_searcher


### Linux

* Ubuntu >= 13.10 (Saucy) or Debian >= 8 (Jessie)

        apt-get install silversearcher-ag
* Fedora 21 and lower

        yum install the_silver_searcher
* Fedora 22+

        dnf install the_silver_searcher
* RHEL7+

        yum install epel-release.noarch the_silver_searcher
* Gentoo

        emerge -a sys-apps/the_silver_searcher
* Arch

        pacman -S the_silver_searcher

* Slackware

        sbopkg -i the_silver_searcher

* openSUSE:

        zypper install the_silver_searcher

* CentOS:

        yum install the_silver_searcher

* SUSE Linux Enterprise: Follow [these simple instructions](https://software.opensuse.org/download.html?project=utilities&package=the_silver_searcher).


### BSD

* FreeBSD

        pkg install the_silver_searcher
* OpenBSD/NetBSD

        pkg_add the_silver_searcher

### Windows

* Win32/64

  Unofficial daily builds are [available](https://github.com/k-takata/the_silver_searcher-win32).

* Chocolatey

        choco install ag
* MSYS2

        pacman -S mingw-w64-{i686,x86_64}-ag
* Cygwin

  Run the relevant [`setup-*.exe`](https://cygwin.com/install.html),
  and select "the\_silver\_searcher" in the "Utils" category.
