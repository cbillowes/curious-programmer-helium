---
title: "Setting up my environment in Fedora - Installing apps"
ogImage: images/og/2018-10-20-apps.png
date:   2018-10-20 18:30:04 +0200
tags:
    - Technical
    - Fedora
    - Linux
---

I had to [re-install](/blog/setting-up-my-environment-in-fedora) so I documented my process.
In this post, I focus on the installation of my most used apps.

---

## Get `dnf` ready

`dnf` is [Dandified YUM](https://en.wikipedia.org/wiki/DNF_(software)), a `.rpm`-based distribution package manager.
To speed up the upgrade download times, try using
[fastest mirror](https://ask.fedoraproject.org/en/question/7960/how-to-choose-a-specific-mirror-source/?answer=16346#post-id-16346).

```bash
# Install the fastestmirror plugin to speed up the upgrade
sudo yum install yum-plugin-fastestmirror
sudo yum clean
sudo yum update

sudo dnf upgrade
```
## Apps

Here are some of the apps I use and where to download them from.

* [Chrome](https://www.google.com/chrome/)
* [GNOME Tweaks](https://connectwww.com/how-to-install-gnome-tweak-tool-or-tweaks-on-ubuntu/60665/)
* [IntelliJ](https://www.jetbrains.com/idea/download/)
* [VS Code](https://code.visualstudio.com/download)
* [Terminator](https://gnometerminator.blogspot.com/p/introduction.html)
* [VNC Viewer](https://www.realvnc.com/en/connect/download/viewer/linux/)
* [Slack](https://slack.com/downloads/linux)
* [Skype](https://www.skype.com/en/get-skype/)
* [Datomic](https://my.datomic.com/downloads/free)

### IntelliJ

#### [Inotify watches limit](https://confluence.jetbrains.com/display/IDEADEV/Inotify+Watches+Limit)

1. Add the following line to either `/etc/sysctl.conf` file or a new `*.conf` file (e.g. `idea.conf`) under `/etc/sysctl.d/` directory:

`fs.inotify.max_user_watches = 524288`

2. Then run this command to apply the change:

`sudo sysctl -p --system`

And don't forget to restart your IDE.

**Note:** the watches limit is per-account setting. If there are other programs running under the same account which also uses Inotify the limit should be raised high enough to suit needs of all of them.

#### No nREPL ack received

The REPL is taking too long to connect and the timeout set in IntelliJ might be too low.

`Settings -> Languages & Frameworks -> Clojure -> REPL startup timeout`

You can bump that up while you investigate why the startup takes so long.

### Java SDK

```bash
sudo dnf search openjdk | grep devel
sudo dnf install -y java-1.8.0-openjdk-devel.x86_64
java -version
which java
```

### Node.js

```bash
sudo dnf search nodejs | grep "nodejs\."
sudo dnf install -y nodejs.x86_64
node --version
which node
```

To get the latest version of nodejs (v.10.x):

```bash
sudo dnf remove nodejs
curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash -
sudo yum -y install nodejs
node --version
which node
```

### Leiningen

[Leiningen](https://leiningen.org/) is the easiest way to use Clojure.
Leiningen and Clojure rquire Java. OpenJDK version 8 is recommended at this time.

```bash
curl -o lein https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein
chmod a+x lein
mv /usr/bin
lein
```

### Gatsby

I use Gatsby for my blog so I need to install it to build, test and deploy my website.

```bash
sudo npm install --global gatsby-cli
```

### Vim

```bash
sudo yum install -y vim
```

### Stopwatch

`gist:cbillowes/ee2b2b9f0ec27d428eaa820a1a6f2242#stopwatch.sh`

### Countdown timer

`gist:cbillowes/bdf2fa386cc41f3863c6d56fcd4527f7#countdown.sh`

### Datomic

* Add license-key to `config/dev-transactor.properties` which is copied and renamed from `config/samples/dev-transactor-template.properties`
* Create console.sh

  ```bash
  #!/bin/bash
  ./bin/console -p 8080 dev datomic:dev://localhost:4334
  ```

  ```bash
  chmod a+x console.sh
  sudo ln -s /home/<user>/Workspace/datomic-pro-0.9.5703/console.sh /usr/bin/datomic-console
  ```

* Create transactor.sh

  ```bash
  #!/bin/bash
  ./bin/transactor config/dev-transactor.properties
  ```

  ```bash
  chmod a+x transactor.sh
  sudo ln -s /home/clarice/Workspace/datomic-pro-0.9.5703/transactor.sh /usr/bin/datomic-transactor
  ```