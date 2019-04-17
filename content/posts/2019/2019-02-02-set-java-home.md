---
title: "Set $JAVA_HOME in Linux"
date:   2019-02-02 05:00:00 +0200
tags:
    - Technical
    - Terminal
    - Cheat sheet
---

$JAVA_HOME an environment variable. It is the root path of the JRE or JDK
which some applications and services use to access Java.

I know that Java is installed `java -version` but its not in the path
`echo $JAVA_HOME`, the output is empty.

## Configure for single user

* Open the shell script in your favorite editor eg. `vim ~/.zshrc` `vim ~/.bashrc`

* Add this line to export the path the the corresponding directory
 `export JAVA_HOME=/usr/bin/java` which can be determined using
 `which java` if you are unsure.

* Add the path to $PATH `export $PATH=$PATH:$JAVA_HOME`

* Save the file.

* Source the file in your terminal eg. `source ~/.zshrc` or `source ~/.bashrc`

* Execute `echo $JAVA_HOME` to verify the output.

## Configure for all users

* Login a root or use `sudo` to execute commands.

* Execute bash `sudo bash`

* Edit `vim /etc/bashrc` or `vim /etc/profile`

* Add `export JAVA_HOME=/usr/bin/java`

* Save the file.

* Source `source /etc/bashrc` or `source /etc/profile`

* Echo `echo $JAVA_HOME`

* `exit` to exit the sudo bash terminal.

## References

* [What is the purpose of .bashrc and how does it work?](https://unix.stackexchange.com/questions/129143/what-is-the-purpose-of-bashrc-and-how-does-it-work) - UNIX StackExchange
* [Setting JAVA_HOME](https://docs.opsgenie.com/docs/setting-java_home) - Atlassian Opsgenie
* [How to Set JAVA_HOME / PATH variables Under Linux Bash Profile](https://www.cyberciti.biz/faq/linux-unix-set-java_home-path-variable/) - nixCraft
