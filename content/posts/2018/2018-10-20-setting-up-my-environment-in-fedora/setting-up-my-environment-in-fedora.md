---
title: "Setting up my environment in Fedora"
ogImage: images/og/2018-10-20-fedora.png
date:   2018-10-20 18:30:00 +0200
tags:
    - Technical
    - Fedora
    - Linux
---

I needed to format my HDD because ... reasons. :grin: For a change, I decided to play around with Fedora
instead of Ubuntu. The installation was painless and the user experience is much like what I am used to.

I had a few hiccups on this journey mainly due to my ignorance in the Linux domain.

It started with difficulties with [backing up my home directory](https://www.ihaveapc.com/2015/01/backup-home-directory-in-linux-using-tar/).
Eventually I came right by creating a new directory and copying what I wanted into it.
This came with the risk of losing data.

Then I faced issues with my hidden files so I created a dotfiles directory and copied what I wanted to it
and un-hid them using a script I wrote inspired by a [TecMint post](https://www.tecmint.com/rename-all-files-and-directory-names-to-lowercase-in-linux/) because they wouldn't tar.

`gist:cbillowes/7c3f3f6de72ba9e92ad4c31c7410e072#unhide.sh`

**I know I must have been doing something wrong but my approach worked for what I needed, it just took time and effort.**

I archived the folder using `tar` and copied it to a virtual machine I own using `rsync` and to an external HDD.
The copies were slow and somehow the copy to the HDD failed and I didn't verify its existence.

Of course, the only backup of my SSH key was in the archive on my server which only had SSH access at the time.
That was an ice cold feeling that I got when I wanted to get my file back.
I had to go into rescue mode on my VM and enable password access. I added my new SSH key `ssh-keygen` to the
authorized_keys on the VM and used `rsync` to get my backup across to my machine.

I installed and configured everything until I noticed something strange with my HDD and mindlessly deleted a partition
which resulted in a glorious destruction of HDD accessibility and my machine would not boot when I restarted.

Fresh format and install, again. The steps I took were fresh in my mind so I made a note to document it.

* [Making backups](/blog/setting-up-my-environment-in-fedora-creating-backups)
* [Creating a boot disk](/blog/setting-up-my-environment-in-fedora-creating-a-boot-disk)
* [Customizing my shell](/blog/setting-up-my-environment-in-fedora-customizing-my-shell)
* [Installing apps](/blog/setting-up-my-environment-in-fedora-installing-apps)