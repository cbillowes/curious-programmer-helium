---
title: "Installing Java"
date:   2018-06-29 18:03:00 +0200
tags:
    - Technical
    - Linux
    - Java
---

I'm installing Java on multiple Linux environments. I am scripting it now but for reference, I'd like to remember the following:

## Using a package manager

**Install the Oracle SDK**

```sh
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
```

**Set $JAVA_HOME**

```sh
sudo update-alternatives --config java
sudo vi /etc/environment
source /etc/environment #reload
echo $JAVA_HOME #test
```

Resource: **[How to install Java with apt-get on Ubuntu](https://digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04)**

## Oracle download

```sh
wget http://javadl.oracle.com/webapps/download/AutoDL\?BundleId\=233162_512cd62ec5174c3487ac17c61aaa89e8 -O jre1.8.0_171.tar.gz
mkdir ~/bin/java
mv jre1.8.0_171.tar.gz ~/bin/java
cd ~/bin/java
tar zxvf jre1.8.0_171.tar.gz
rm *.tar.gz

JAVA_HOME=/home/<user>/bin/jre1.8.0_171
export JAVA_HOME
PATH=$PATH:$JAVA_HOME/bin
export PATH
```