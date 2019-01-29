---
title: "Checking Disk Usage in Linux"
ogImage: images/og/2019-01-13-disk-usage.png
date:   2019-01-13 07:30:00 +0200
tags:
    - Technical
    - Linux
    - Terminal
    - Cheat Sheet
---

I had to find out  much free space was available
on a file system on a Linux server. Now getting this information on the GUI is
simple - a few clicks, modals and stuff, but the server doesn't
have a GUI so it's off to the terminal I go :yum:

The other scenario I faced was figuring out the disk usage of
certain files and directories.

I accumulated a bunch of commands through co-workers and Google,
jotted them down and decided that this post will be my
research and [cheat sheet](#cheat-sheet). I hope future me
and you can benefit from this.

---

This post forms part of a sequence of command line references that I
will be writing where I forget the command or its syntax or find it
interesting enough to document.

Although it is easily Google-able, there are usually a chain of
commands that I want kept together for reference.

The commands I use should be universal but just in case, **I am
running Fedora release 28 (Twenty Eight) and Zsh.** Sometimes I will
refer to server commands in which case I will specify the server OS.

> Also, if you want to contribute something interesting in any of
> my posts, please create a
> [pull-request](https://github.com/cbillowes/curious-programmer-helium)
> or write a comment below. :smile:

---

> **Just so by the way, I find this freakin' awesome:**<br/>
> Use  `-- -x` to
> grep anything starting with a `-`. I find this useful when looking
> up switches for programs in their manuals
> `bash±man sudo | grep -- -u`.
>
> A more efficient way is to `man sudo` press `/` enter your
> search phrase, press `n` for next until you
> find your switch. You can read everything about the switch instead
> of one line.

## Getting disk space for your file system

`bash±df` will show you the amount of disk space available on your file system.

### Blocks
```extract
1K-blocks     Used Available Use%
  8145968        0   8145968   0%
```

Disk space is shown in 1K blocks unless its overridden when
the environment variable `POSIXLY_CORRECT` is set. Then 512 byte
blocks are used.

> **[By the way, according to the GNU standards](https://www.gnu.org/prep/standards/html_node/Non_002dGNU-Standards.html)**:
> "GNU utilities mostly follow specifications of POSIX.2.
> POSIX.2 specifies that `df` and `du` must output sizes by default in
> units of 512 bytes. What users want is units of 1K, so that is what
> we do by default. If you want the ridiculous behavior “required” by
> POSIX, you must set the environment variable `POSIXLY_CORRECT`
> (which was originally going to be named `POSIX_ME_HARDER`)."

### Sizes

You can print sizes in a more human friendly way using
the `-h` switch.

```bash
df -h
```
```extract
Size  Used Avail Use%
7.8G     0  7.8G   0%
```

### Usage reports

#### Local mounted file systems

When you run `bash±df -h` you will get a usage report on all
**mounted file systems** with human readable sizes.

The `-l` switch will only print local file systems which
excludes any remote file systems.

```bash
df -lh
```
```example
➜  resources  ➜ df -lh
Filesystem               Size  Used Avail Use% Mounted on
devtmpfs                 7.8G     0  7.8G   0% /dev
tmpfs                    7.8G  178M  7.7G   3% /dev/shm
tmpfs                    7.8G  2.0M  7.8G   1% /run
tmpfs                    7.8G     0  7.8G   0% /sys/fs/cgroup
/dev/mapper/fedora_root   49G   18G   29G  38% /
tmpfs                    7.8G   15M  7.8G   1% /tmp
/dev/sda1                976M  242M  668M  27% /boot
/dev/mapper/fedora_home  976G   68G  859G   8% /home
tmpfs                    1.6G   16K  1.6G   1% /run/user/42
tmpfs                    1.6G  8.5M  1.6G   1% /run/user/1000
```
You can pass in paths and file names as arguments. You will get
the disk space available for the file systems each one is on.

```bash
df -lh / ~
```
```example
➜  ~ ➜ df -lh / ~
Filesystem               Size  Used Avail Use% Mounted on
/dev/mapper/fedora_root   49G   18G   29G  39% /
/dev/mapper/fedora_home  976G   80G  847G   9% /home
```

#### Pseudo, duplicate and inaccessible file systems

There are also pseudo, duplicate and inaccessible file systems. You
can get information on all of them using the all `-a` switch.

```bash
df -lah
```
```example
➜  resources  ➜ df -lah
Filesystem                Size  Used Avail Use% Mounted on
sysfs                        0     0     0    - /sys
proc                         0     0     0    - /proc
devtmpfs                  7.8G     0  7.8G   0% /dev
securityfs                   0     0     0    - /sys/kernel/security
tmpfs                     7.8G  2.0M  7.8G   1% /run
tmpfs                     7.8G     0  7.8G   0% /sys/fs/cgroup
/dev/mapper/fedora_root    49G   18G   29G  38% /
tmpfs                     7.8G   14M  7.8G   1% /tmp
/dev/mapper/fedora_home   976G   80G  847G   9% /home
...
```

> **Pseudo file systems** keep information about "pretend" file
> systems. It contains virtual entries which exist in RAM so it
> does not persist on reboots.
> Examples include `/proc` which is a procfs and dynamically
> generates directories for each process.
> `/sys` generates hardware layout for physical devices in the
> machine in a bunch of files and directories.

---

## Getting disk usage for files and directories

### Usage estimation

`bash±du` estimates the disk usage of a bunch of files and
directories that you choose. It will recursively calculate
the usage of directories for you. The below command will operate
on the current working directory.

```bash
du -h
```
```example
➜  public  ➜ du -h
20K     ./html
28K     ./public/img
4.0K    ./public/js
8.0K    ./public/css
48K     ./public
8.0K    ./docs
80K     .
```

The `-s` switch will only print out the summary of disk
space used by each file and directory.

```bash
du -hs
```
```example
➜  public  ➜ du -hs
80K     .
```

You can pass in paths to directories and files to the get estimated
disk usage for them. With `-a` you will get all files, not just directories.

```bash
du -ah logos fonts
```
```example
➜ public ➜ du -ah logos fonts
8.0K    logos/logo.png
4.0K    logos/128x128.png
 20K    logos/512x512.png
4.0K    logos/64x64.png
4.0K    logos/32x32.png
 44K    logos
4.0K    fonts/timeline.ttf
8.0K    fonts/timeline.svg
 12K    fonts/selection.json
4.0K    fonts/timeline.woff
4.0K    fonts/timeline.eot
 36K    fonts
```

> `du` takes a **shell pattern** argument.
>  This is not a regular expression.<br/>
> &bull; **?** matches a single character.<br/>
> &bull; **\*** matches any string.<br />

Examples of how to use the file name shell pattern:

* `file.?ar` will return files where the extension ends with
  a three letter extension ending in **?ar** like `tar` and `rar`

* `*.json` will return all **json** files which you could also
exclude using `--exclude="*.json"`

Below I want all files excluding **html** and **txt** files.
```bash
du -hs * --exclude="*.html" --exclude="*.txt"
```
```example
➜  public ➜ du -hs * --exclude="*.html" --exclude="*.txt"
4.0K	favicon.png
36K	    fonts
13M	    images
44K	    logos
```

### Sorting results
You can sort the output in reverse (`-r`) numerical order (`-n`)
plus you can page through the results (`less`).

```bash
du -h | sort -rn | less
```
```example
➜  resources  ➜ du -h | sort -rn | less
80K     .
48K     ./public
28K     ./public/img
20K     ./html
8.0K    ./public/css
8.0K    ./docs
4.0K    ./public/js
```
Futhermore, you can print out 1 to the *nth* results.
This includes the summary as it is part of the result set.

```bash
du -h | sort -rn | head -n 3
```
```example
➜  resources  ➜ du -h | sort -rn | head -n 3
80K     .
48K     ./public
28K     ./public/img
```

## Listing directories and files with their size

### Using the ls utility
You can page through a column of all files and directories which
include multiple attributes including the file size.
This will include hidden files such as your dotfiles.

```bash
ls -lah | less
```
```example
➜  imgs ➜ ls -lah | less
total 48K
drwxrwxr-x. 2 clarice clarice 4.0K Jan 12 06:05 .
drwxrwxr-x. 7 clarice clarice 4.0K Jan 12 06:05 ..
-rw-------. 1 clarice clarice 3.8K Jan 12 06:05 128x128.png
-rw-------. 1 clarice clarice  989 Jan 12 06:05 32x32.png
-rw-------. 1 clarice clarice  20K Jan 12 06:05 512x512.png
-rw-------. 1 clarice clarice 1.9K Jan 12 06:05 64x64.png
-rw-------. 1 clarice clarice 6.8K Jan 12 06:05 logo.png
```

Note that there is a total on the top left showing how much
space is being used.

#### Sorting

Use `-S` to sort by file size. The largest file size will be printed first.
`-r` will reverse the sorting order.

```bash
ls -lahS
```
```bash
ls -lahSr
```

#### Recursive listing

Recursive directories are not supported by default. To list recursively
add the `-R` switch but beware.

> **The buffer!** Yeah, if you chose to run this command on
> **/** or any large project, you might not be able to see all your results.
> You could write your results to a file
> if you really need this information `bash±ls -lahR > space.out`.
> If you notice that it is taking too long then you can `tail -f space.out`

```bash
ls -lahR
```
```bash
ls -lahR > space.out
```
```bash
tail -f space.out
```

### Using the tree utility

`bash±tree` is a utility that needs to be installed.
It will recursively iterate and list your files
in a really cool colored tree-like structure.
No colors in the examples though :pensive:, so go on - use it. :stuck_out_tongue:

```example
➜  public ➜  tree
.
├── favicon.png
├── fonts
│   ├── selection.json
│   ├── timeline.eot
│   ├── timeline.svg
│   ├── timeline.ttf
│   └── timeline.woff
├── google484846af030102e2.html
├── images
│   └── profile.jpg
├── index.html
├── logos
│   ├── 128x128.png
│   ├── 32x32.png
│   ├── 512x512.png
│   ├── 64x64.png
│   └── logo.png
├── manifest.webmanifest
├── render-page.js.map
└── robots.txt
```

You can add file sizes to the tree by adding `-s` and combine it with `-h`
to print out the human friendly file size next to each file and
directory.

```bash
tree -sh
```
```example
➜  public ➜ tree -sh
.
├── [ 1.9K]  favicon.png
├── [ 4.0K]  fonts
│   ├── [ 9.6K]  selection.json
│   ├── [ 2.9K]  timeline.eot
│   ├── [ 6.0K]  timeline.svg
│   ├── [ 2.8K]  timeline.ttf
│   └── [ 2.8K]  timeline.woff
├── [   53]  google484846af030102e2.html
├── [ 4.0K]  images
│   └── [  35K]  profile.jpg
├── [ 1.7K]  index.html
├── [ 4.0K]  logos
│   ├── [ 3.8K]  128x128.png
│   ├── [  989]  32x32.png
│   ├── [  20K]  512x512.png
│   ├── [ 1.9K]  64x64.png
│   └── [ 6.7K]  logo.png
├── [  344]  manifest.webmanifest
├── [  97K]  render-page.js.map
└── [  122]  robots.txt
```

---

## Cheat sheet

**Grep anything starting with** `-`
```bash
man sudo | grep -- -u
```

### Disk usage on file systems

**With human-readable sizes on all mounted file systems**
```bash
df -h
```

**Local file systems only**
```bash
df -lh
```

**For the file system each path/file specified is on**
```bash
df -lh / ~
```

**For pseudo, duplicate and inaccessible file systems**
```bash
df -lah
```

### Disk usage of files

**Get estimated usage with human-readable sizes**
```bash
du -h
```

**Get a summary of disk space used**
```bash
du -hs
```

**Get all files for a give path**
```bash
du -ah public/logos
```

**Exclude files**
```bash
du -hs * --exclude="*.html" --exclude="*.txt"
```

**Sort**
```bash
du -h | sort -rn | less
```

**Get the top three sorted results**
```bash
du -h | sort -rn | head -n 3
```

#### Listing directories and files using *ls*

**Get a paged list of files and directories**
```bash
ls -lah | less
```

**Sort the results by file size**
```bash
ls -lahS | less
```

**Reverse the sorted results**
```bash
ls -lahSr | less
```

**Recursively list files and directories**
```bash
ls -lahR
```

**Print the output of a recursive list to a file**
```bash
ls -lahR > space.out
```

**Watch a file while it is being printed to**
```bash
tail -f space.out
```

**List a tree of files and directories with file sizes**
```bash
tree -sh
```

## Resources

* `bash±man du`
* `bash±man df`
* `bash±man tree`
* `bash±man ls`
* [Non-GNU Standards](https://www.gnu.org/prep/standards/html_node/Non_002dGNU-Standards.html) - gnu.org
* [Differences between df, df-h and df -l](https://askubuntu.com/questions/425791/differences-between-df-df-h-and-df-l) - askubuntu
* [What is a pseudo file system in Linux?](https://superuser.com/questions/1198292/what-is-a-pseudo-file-system-in-linux#answer-1198293) - StackExchange
* [Useful "df" Commands to Check Disk Space in Linux](https://www.tecmint.com/how-to-check-disk-space-in-linux/)
