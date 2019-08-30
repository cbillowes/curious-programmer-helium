---
title: "Setup macOS development environment"
date:   2019-08-30 03:00:00 +0200
tags:
    - Technical
    - Gems
---

> **Note:** I am running macOS Mojave on a 2.8 GHz Intel Core i7 with 16 GB 2133 MHz LPDDR3 RAM.
> I am setting up my environment to write some awesome Clojure code.

## Brew
https://brew.sh/

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## Java
https://github.com/AdoptOpenJDK/homebrew-openjdk
https://apple.stackexchange.com/questions/334384/how-can-i-install-java-openjdk-8-on-high-sierra

```bash
brew tap AdoptOpenJDK/openjdk
brew install <version>
```

Versions:
adoptopenjdk-openjdk8
adoptopenjdk-openjdk9
adoptopenjdk-openjdk10

## Clojure
https://clojure.org/guides/getting_started

```bash
brew install clojure
```

## Leiningen
https://github.com/technomancy/leiningen
https://formulae.brew.sh/formula/leiningen

```bash
brew install leiningen
```

## Node
https://nodesource.com/blog/installing-nodejs-tutorial-mac-os-x/
https://nodejs.org/en/download/

```bash
sudo npm install npm --global # Update the `npm` CLI client
```

## shell

### oh-my-zsh
https://ohmyz.sh/

```bash
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

### Powerlevel9k
https://github.com/Powerlevel9k/powerlevel9k#installation

```bash
brew tap sambadevi/powerlevel9k
brew install powerlevel9k
```

```bash
git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
```

```bash
ZSH_THEME="powerlevel9k/powerlevel9k" #update ~/.zshrc file
zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
Activate plugins in ~/.zshrc under plugins:
plugins=(git zsh-syntax-highlighting zsh-autosuggestions)
```

https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md#oh-my-zsh

## Tools

### Git
https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

### iTerm2
https://www.iterm2.com/

### vim syntax highlighting
https://www.codexpedia.com/text-editor/turn-on-syntax-highlighting-for-vim-on-mac-os/

### Gatsby
https://www.gatsbyjs.org/docs/quick-start/

```bash
npm install -g gatsby-cli
```

### Emacs
https://emacsformacosx.com/

### Spacemacs
https://practicalli.github.io/spacemacs/

Due to a bug in emacs 26.5, emacs is unable to verify the GPG signatures of packages downloaded from elpa.
Therefore, until this is resolved by the emacs community, the following work-around needs to be applied;

Modify the `init.el` in `.emacs.d/initl.el`, and add at or near the top of the file the following line;
`(setq package-check-signature nil)`

Secondly, the spacemacs configuration (edit `~/.spacemacs`) needs to be modified to allow the editor to download packages from elpa via unsecure channels, this is done by modifying the following settings;
`dotspacemacs-elpa-https nil`

When using `helm`, and `helm-ag`, the executable for silver surfer (ag) needs to be but onto your
path so that emacs can find and use it.

```bash
brew install the_silver_searcher
```

#### .spacemacs config
https://gist.github.com/cbillowes/094ab477b6b28f31e0809bc9655f5c67
https://github.com/practicalli/spacemacs-config/blob/master/.spacemacs.d/init.el

#### themes
Press `SPC T n` to cycle to the next theme in the list

#### Adjusting window sizes
You may have a configuration where the golden ratio or zoom has been configured

* Toggle zoom `SPC t g`
* Toggle golden ratio mode `SPC SPC > golden-ratio-mode`
