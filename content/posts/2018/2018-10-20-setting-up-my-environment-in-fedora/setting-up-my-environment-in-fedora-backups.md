---
title: "Setting up my environment in Fedora - Creating backups"
ogImage: images/og/2018-10-20-backups.png
date:   2018-10-20 18:30:01 +0200
tags:
    - Technical
    - Linux
    - Fedora
---

I had to [re-install](/blog/setting-up-my-environment-in-fedora) so I documented my process.
In this post, I focus on getting my data backed up so that I can restore it after the
installation.

---

Whatever isn't in git gets archived. This is mainly my home directory.
I want it backed up to my VM at [CloudAfrica](https://www.cloudafrica.net/)
and to my external HDD. If I have learned anything in this process it is that my SSH keys are
the most vital piece of bits that I own and that I need one copy in a *safe* location.
*Whatever safe means in this world.*

## Archive

```bash
tar cpzvf <archive>.tar.gz /home/<username>
```

* -c, --create
* -p, --preserve-permissions, --same-permissions
* -z, --gzip, --gunzip, --ungzip
* -v, --verbose
* -f, --file=ARCHIVE

## Copy to server

```bash
rsync -avzh <username>@<host>:/path/to/copy/to/<archive>.tar.gz /path/to/copy/from/<archive>.tar.gz
```

* -a, --archive
* -v, --verbose
* -z, --compress
* -h, --human-readable

*I had a few permissions hiccups trying to tar my home directory so I took extra
[steps](/blog/setting-up-my-environment-in-fedora) to tackle these problems.*

## Remote Git Repository

I use my own remote git repository for directories that contain sensitive information.
I followed these [instructions](https://git-scm.com/book/en/v2/Git-on-the-Server-Setting-Up-the-Server)
to get set up.

Create a `git` user and allow `ssh` access to authorized users. On the local machine copy the public key
`cat ~/.ssh/id_rsa.pub` (or whichever public key you use) and paste it into `.ssh/authorized_keys` after it
has been created.

```bash
ssh <username>@<host>
sudo adduser git
su git
mkdir /.ssh && chmod 700 /.ssh
touch .ssh/authorized_keys && chmod 600 .ssh/authorized_keys
```

Create the `.git` project and initialize it.

```bash
cd /srv/git
mkdir project.git
cd project.git
git init --bare
```

Configure the git repo locally and point to the newly created remote repository.

```bash
cd /home/<user>/path/to/project
git init
git add .
git commit -m "Initial commit"
git remote add origin git@<host>:/srv/git/project.git
git push origin master
```

*If you have problems pushing, check that the directory permissions are not assigned to root `ls -lah`.
Assign the files and folders to git using `sudo chown git *`*

## Global save-to-git script

Let's take a practical example: I want to store my [Gnote](https://wiki.gnome.org/Apps/Gnote) notes to my remote repository.

1. Create a bash script `save-gnote` and add it to git. Make it add all
unstaged files in the gnote directory and commit them using a timestamp in the commit message then push to origin.

```bash
#!/bin/bash

cd /home/<user>/.local/share/gnote
git add .
git commit -m "Backup $(date +%s)"
git push origin master
```

2. Give the script execution rights `chmod a+x save-gnote`.
3. Create a symlink to access the script from anywhere.

```bash
ln -s /home/<user>/.local/share/gnote/save-gnote /usr/local/bin/save-gnote
```

4. Access `save-gnote` from any directory in the terminal.