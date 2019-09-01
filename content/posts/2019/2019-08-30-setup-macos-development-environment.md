---
title: "Setup macOS development environment"
date:   2019-08-30 03:00:00 +0200
tags:
    - Technical
    - Gems
---

> **Note:** I am running macOS Mojave on a 2.8 GHz Intel Core i7 with 16 GB 2133 MHz LPDDR3 RAM.
> I am setting up my environment to write some awesome Clojure code.

I need to create an environment for Clojure and NodeJS development.

## Homebrew
The missing package manager for macOS (or Linux).

[Wiki](https://en.wikipedia.org/wiki/Homebrew_(package_management_software)) |
[brew](https://brew.sh/)

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

The script explains what it will do and then pauses before it does it. Read about other
installation options. Install Homebrew on Linux and Windows Subsystem for Linux.

## Java OpenJDK
OpenJDK is a free and open-source implementation of the Java SE Platform Edition. It was initially
released in 2007 as the result of the development that Sun Microsystems started in 2006.

Certainly, we should emphasize that the OpenJDK is an official reference implementation of a Java
Standard Edition since version SE 7.

Initially, it was based only on the JDK 7. But, since Java 10, the open-source reference
implementation of the Java SE platform is the responsibility of the JDK Project. And, just like
for the Oracle, the JDK Project will also deliver new feature releases every six months.

[Wiki](https://en.wikipedia.org/wiki/OpenJDK) |
[Github](https://github.com/AdoptOpenJDK/homebrew-openjdk) |
[StackExchange](https://apple.stackexchange.com/questions/334384/how-can-i-install-java-openjdk-8-on-high-sierra)

```bash
brew tap AdoptOpenJDK/openjdk
brew install <version>
```

**Versions**:
adoptopenjdk-openjdk8
adoptopenjdk-openjdk9
adoptopenjdk-openjdk10

## Clojure
Clojure is a modern, dynamic, and functional dialect of the Lisp programming language on the Java
platform. Like other Lisps, Clojure treats code as data and has a Lisp macro system. The current
development process is community-driven, overseen by Rich Hickey as its benevolent dictator for life.

[Wiki](https://en.wikipedia.org/wiki/Clojure) |
[Clojure.org](https://clojure.org/guides/getting_started)

```bash
brew install clojure
```

## Leiningen
Leiningen is a build automation and dependency management tool for the simple configuration of
software projects written in the Clojure programming language. Leiningen was created by Phil Hagelberg.

[Wiki](https://en.wikipedia.org/wiki/Leiningen_(software)) |
[Github](https://github.com/technomancy/leiningen) |
[Homebrew](https://formulae.brew.sh/formula/leiningen)

```bash
brew install leiningen
```

## Node
Node.js is an open-source, cross-platform, JavaScript run-time environment that executes JavaScript
code outside of a browser.

[Wiki](https://en.wikipedia.org/wiki/Node.js) |
[NodeSource](https://nodesource.com/blog/installing-nodejs-tutorial-mac-os-x/) |
[NodeJS](https://nodejs.org/en/download/)

```bash
sudo npm install npm --global # Update the `npm` CLI client
```

## shell

### iTerm2
iTerm2 is a GPL-licensed terminal emulator for macOS. It was derived from and has mostly supplanted
the earlier "iTerm" application. iTerm2 supports operating system features such as window transparency,
full-screen mode, Exposé Tabs, Growl notifications, and standard keyboard shortcuts.

[Wiki](https://en.wikipedia.org/wiki/ITerm2) |
[iTerm2](https://www.iterm2.com/)

### oh-my-zsh
Oh My Zsh is an open source, community-driven framework for managing your zsh
configuration. Sounds boring.

[Ohmyz](https://ohmyz.sh/) |
[Github](https://github.com/robbyrussell/oh-my-zsh)

The Z shell (zsh) is a Unix shell that can be used as an interactive login shell
and as a command interpreter for shell scripting. Zsh is an extended Bourne shell
with many improvements, including some features of Bash, ksh, and tcsh.

[Wiki](https://en.wikipedia.org/wiki/Z_shell)

```bash
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

### Powerlevel9k
Powerlevel9k is a theme for ZSH which uses Powerline Fonts. It can be used with
vanilla ZSH or ZSH frameworks such as Oh-My-Zsh, Prezto, Antigen, and many others.
Get more out of your terminal. Be a badass.

[Github](https://github.com/Powerlevel9k/powerlevel9k#installation)

```bash
brew tap sambadevi/powerlevel9k
brew install powerlevel9k
```

```bash
git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
```

```bash
ZSH_THEME="powerlevel9k/powerlevel9k" #update ~/.zshrc file
```

**zsh-syntax-highlighting**

This package provides syntax highlighting for the shell zsh. It enables highlighting
of commands whilst they are typed at a zsh prompt into an interactive terminal. This
helps in reviewing commands before running them, particularly in catching syntax errors.

[Github](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md#oh-my-zsh)

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

**zsh-autosuggestions**

It suggests commands as you type based on history and completions.

[Github](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md#oh-my-zsh)

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

**Activate plugins in ~/.zshrc under plugins:**

```bash
plugins=(git zsh-syntax-highlighting zsh-autosuggestions)
```

## Tools

### Git
A staggering number of software projects rely on Git for version control, including
commercial projects as well as open source.

[Atlassian](https://www.atlassian.com/git/tutorials/what-is-git) |
[Wiki](https://en.wikipedia.org/wiki/Git) |
[Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### vim syntax highlighting
To enable the syntax coloring for vim, go to your home directory, and open or create the
`.vimrc` file if it doesn’t already exist.

[Codexpedia](https://www.codexpedia.com/text-editor/turn-on-syntax-highlighting-for-vim-on-mac-os/)

```bash
cd ~
vim .vimrc
```

```bash
filetype plugin indent on
syntax on
```

Toggle syntax highlighting in Vim, press Esc and then type the below and enter:

```bash
:syntax <on|off>
```

### Gatsby
Gatsby is a React-based, GraphQL powered, static site generator. ...
It uses powerful preconfiguration to build a website that uses only static files for
incredibly fast page loads, service workers, code splitting, server-side rendering,
intelligent image loading, asset optimization, and data prefetching.

[MediaCurrent](https://www.mediacurrent.com/what-is-gatsby.js) |
[Gatsby](https://www.gatsbyjs.org/docs/quick-start/)

```bash
npm install -g gatsby-cli
```

### Emacs
is a family of text editors that are characterized by their extensibility. The manual
for the most widely used variant, GNU Emacs, describes it as "the extensible,
customizable, self-documenting, real-time display editor".

[Wiki](https://en.wikipedia.org/wiki/Emacs) |
[emacsformacosx](https://emacsformacosx.com/)

### Spacemacs
It can take advantage of all of GNU Emacs' features, including both graphical and
command-line user interfaces, and being executable under X Window System and within a
Unix shell terminal.

Spacemacs consists mainly of configuration files, pre-defined internal commands, and
configurations for various plug-ins (called 'packages').

It has three user-selectable input modes: Emacs mode, Vim mode (based on the evil
Emacs package for Vim emulation), and Hybrid mode.

[Wiki](https://en.wikipedia.org/wiki/Spacemacs) |
[Practicalli](https://practicalli.github.io/spacemacs/)

Emacs could not verify the GPG signatures of packages downloaded from elpa.
I applied the following workaround:

Modify the `init.el` in `.emacs.d/initl.el`, and add at or near the top of the file the following line;
`(setq package-check-signature nil)`

Secondly, the spacemacs configuration (edit `~/.spacemacs`) needs to be modified to allow the editor to download packages from elpa via unsecure channels, this is done by modifying the following settings;
`dotspacemacs-elpa-https nil`

When using `helm`, and `helm-ag`, the executable for silver surfer (ag) needs to be but onto your
path so that emacs can find and use it.

```bash
brew install the_silver_searcher
```

Perhaps [this](https://emacs.stackexchange.com/questions/36889/turn-on-package-check-signature-and-install-elpa-packages-on-mac-os-x-emacs)
will work to solve this issue. I haven't tried it yet.

#### .spacemacs config
Keep a copy of your config under version control in the event something goes wrong when you change it.

[Github](https://gist.github.com/cbillowes/094ab477b6b28f31e0809bc9655f5c67) |
[Practicalli](https://github.com/practicalli/spacemacs-config/blob/master/.spacemacs.d/init.el)

#### themes
Press `SPC T n` to cycle to the next theme in the list
I now use `apropospriate-dark`.

[Github](https://github.com/waymondo/apropospriate-theme)

#### Treemacs layer
This layer sets up a file navigation and project explorer side-window via Treemacs.

[Spacemacs](http://develop.spacemacs.org/layers/+filetree/treemacs/README.html)

Navigate down `j` and `k`. Go to parent directory `h` and child directory `l`.

#### Adjusting window sizes
You may have a configuration where the golden ratio or zoom has been configured

* Toggle zoom `SPC t g`
* Toggle golden ratio mode `SPC SPC > golden-ratio-mode`
* Balance windows area `SPC w =`
