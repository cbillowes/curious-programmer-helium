---
title: "Git aliases"
date:   2019-09-02 03:00:00 +0200
tags:
    - Technical
    - Git
---

You can create Git aliases for long or repetitive commands which map to short cuts.
This can make your workflow more efficient as it decreases the number of keystrokes involved.

You create your alias using the Git config command which updates the Git configuration files (local or global scope).
You can create them using the `git config` command. Your alias will not include the `git` command.
So `git checkout` will be `git config --global alias.co checkout`


```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
```

I've edited my global configuration file `~/.gitconfig` and added the following aliases

```bash
[alias]
  pp = log --graph --abbrev-commit --decorate --date=relative --all
  st = status --short --branch
  lg = log --pretty='%Cblue%h%Creset | %C(yellow)%d%Creset %s %Cgreen(%cr)%Creset %C(cyan)[%an]%Creset' --graph
  dp = diff --word-diff --unified=10
  s = status
  a = add
  cm = commit -m
  pushall = !git remote | xargs -L1 git push --all
```

* **pp**: pretty print the log
* **st**: short status
* **lg**: pretty log
* **dp**: pretty diff
* **s**: short for status
* **a**: short for add
* **cm**: short for commit message
* **pushall**: pushes to all remotes
