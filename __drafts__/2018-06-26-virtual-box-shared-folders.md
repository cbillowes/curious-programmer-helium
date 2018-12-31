---
title: "VirtualBox Shared Folders"
date:   2018-06-26 06:30:00 +0200
tags:
    - Technical
    - VirtualBox
---

I am using VirtualBox as a development and configuration playground. I need a common folder to share scripts and files so that I don't need to reinvent it on the guest environment.

I am yet to get clipboard and drag and drop to work with the guest additions but for now the shared folder will be phenomenally adequate.

This setup is using VirualBox running a guest and host environment of Ubuntu 18.04.

## Create

* VirtualBox > Devices > Insert Guest Additions CD image... > Download and run
* Create or use an existing folder on the host i.e `~/nucleus`
* Boot Guest
* VirtualBox settings > Devices > Shared Folders... > Add
* Select folder > Optionally "Make permanent"

## Mount folder

* Create a bash `vi mnt.sh`
* Add the following

    ```sh
    sharename="nucleus"  #use the name of the folder on the host machine
    sudo mkdir /mnt/$sharename
    sudo chmod 777 /mnt/$sharename
    sudo mount -t vboxsf -o uid=1000,gid=1000 $sharename /mnt/$sharename
    ln -s /mnt/$sharename $HOME/Desktop/$sharename
    ```

* Make it executable `chmod +x mnt.sh`
* Run `./mnt.sh`

## Access folder

* Other locations > mnt > nucleus

## Unmount folder

* `sudo umount /mnt/nucleus/`
* `sudo rm -rf /mnt/nucleus/`
* Devices > Shared Folders > Shared Folders Settings... > Remove machine folder

## Resources

* [Ubuntu documentation - VirtualBox/SharedFolders](https://help.ubuntu.com/community/VirtualBox/SharedFolders)
* [Unmount after bind](https://askubuntu.com/questions/156667/how-to-unmount-after-using-mount-bind-option)