---
title: "Create a symlink for hidden files"
date:   2019-01-27 11:00:00 +0200
tags:
    - Technical
    - Terminal
    - Linux
---

I want to create a symlink for all hidden files excluding the hidden
directories. I want to put my configuration files in my home directory
into version control.

I need to exclude the hidden directories because they contain binaries
and what not.

Using this one liner, I can create a symbolic link for every hidden file
in my home directory to my working (or target) directory.

```bash
for f in .*; do if [[ -f $f ]]; then ln -s /home/me/$f /home/me/working/directory/$f; fi; done
```

I execute this from my source directory.

I can verify that my symlinks exist in my target directory

```bash
cd /home/me/working/directory
ls -lah
```

I should see a few lines that look like this:

```example
lrwxrwxrwx. 1 me me   26 Jan 27 10:49 .zsh_history -> /home/me/.zsh_history
lrwxrwxrwx. 1 me me   20 Jan 27 10:49 .zshrc -> /home/me/.zshrc
```
