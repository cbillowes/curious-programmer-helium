---
title: "Why I Create Atomic Commits In Git"
ogImage: /images/og/2019-01-15-git.png
date:   2019-01-26 11:00:00 +0200
tags:
    - Technical
    - Terminal
    - Git
    - CLI
---

I
[wrote](/blog/how-to-craft-your-changes-into-small-atomic-commits-using-git)
about crafting changes into small atomic commits using Git.
It looked like there was some confusion. I want to share
what I understand about atomic and monolithic commits and why I create atomic
commits in Git.

> I got a question in
> [Reddit](https://www.reddit.com/r/programming/comments/agxi5o/how_to_craft_your_changes_into_small_atomic/)
> by WetDynamics that "atomic commits sound nice in theory but in
> practice you end up with 100 commits of "extracted foo into a
> method" or "refactored bar to make it more readable". Does it
> really make your git history easier to grok than a single commit
> focused on a feature?"

I think we are on the same page. I feel as though my intent was not
clear in my
[previous](/blog/how-to-craft-your-changes-into-small-atomic-commits-using-git)
post.

## An atomic commit
Let's say I do a refactor but I also update a some features and add new
ones.

In an atomic commit, I will commit the refactor and each feature change
separately.

I don't know what the official definition is but to me an atomic commit is a **commit that focuses
on one context and one context alone**. Granted, this is tricky. I do this to the best of
my abilities but I don't always get it right.

> **Disclaimer:** I don't intend that I commit each and every single line
> or function. By context I mean a single topic: a feature, bug fix,
> refactor, upgrade, task...

## A monolithic commit
Again. Let's say I do a refactor but I also update a some features and add new ones.

The **entire changeset** gets committed in a monolithic commit.

Granted, it doesn't have to be a large commit. It's a commit with changes
tightly coupled into a single commit. Like a tangled or
spaghetti commit.

The larger the commit, the more brittle and error prone it becomes because it
becomes harder to understand (even if it's well documented - I know this from
my own doing), read, review and revert.

## Why go atomic?

Atomic commits are easier to:
* **track** - I know where they are in the history. `git log --oneline`
  shows me all commits. `git log --grep <pattern>` lets me find a commit based
  on a partial message. `git log <commit>` will jump to that commit and
  show previous commits.

* **understand** - I document each change with a commit message and elaborate
  with an explanation if I need to.

* **read** - it's a change focused on a single context which makes it smaller,
  simpler and easier to read the patch `git show <commit>` or `git log <commit> -p`

* **review** - as it's a small, focused, documented change, a reviewer should
  be able to follow the code changes and keep their sanity.

* **revert** - reverting `git revert <commit>` an atomic commit will not revert
  unrelated changes like a monolithic commit would.

## What do I do?

* **I try working on one thing** - this is not always possible, hence my
  [previous](/blog/how-to-craft-your-changes-into-small-atomic-commits-using-git)
  post. This is where I use the interactive mode to my advantage. Most GUIs come with
  intuitive interfaces.

  `git add -i`

* **I try keep my changes as small as possible** - this makes it easier for me to
  commit my changes once I am done especially when I go into an interactive mode.

* **I try to commit often** - I amend my commits when I need to.

  `git commit -m "<message>" --amend`

* **I aim to be vigilant that tests pass** (I get this wrong sometimes). I want
  failing/code tests fixed and committed as part of the context commit. Otherwise
  I have a "broken" commit.

* **When I end up littering my feature commits** (features have
  commits in a random order) then I use an interactive rebase to move and
  squash the commits prior to pushing them.

  `git rebase -i`

> The goal of creating atomic commits is not to create "100 commits" but
> rather **pragmatically** craft relevant changes for a better history,
> cognitive load and an easier means to rollback changes.

