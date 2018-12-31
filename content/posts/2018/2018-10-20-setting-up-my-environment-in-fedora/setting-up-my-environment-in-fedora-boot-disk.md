---
title: "Setting up my environment in Fedora - Creating a boot disk"
socialCover: 2018-10-20-usb-flash-drive.png
date:   2018-10-20 18:30:02 +0200
tags:
    - Technical
    - Fedora
---

I had to [re-install](/blog/setting-up-my-environment-in-fedora) so I documented my process.
In this post, I focus on getting a Fedora 28 live media installation ready on a USB boot disk
so that I can begin the installation process.

---

**Note:** I am using a Lenovo Ideapad 330. When the logo appears on boot I need to enter the BIOS
using the `F2` key. In order to boot from USB I need to enable legacy boot and move the 
USB boot option to the top of the list.

I used the `dd` command to convert and copy the ISO to the USB drive.

1. [Download](https://getfedora.org/en_GB/workstation/download/) the ISO. Check out [LinuxLookup](http://www.linuxlookup.com/linux_iso)
   for other distros.
2. Display all disk partitions to get the USB device.

```bash
fdisk -l

#results
Disk /dev/sdc: 7.5 GiB, 8053063680 bytes, 15728640 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x3a663a44
```

3. Copy the ISO to the USB drive.

```bash
dd if=/path/to/Fedora-Workstation-Live-x86_64-28-1.1.iso of=/dev/sdc
```

* **if = input file** - read from file instead of stdin
* **of = output file** - write to file instead of stdin

Note that there are other methods to create live installation images in the 
[terminal](http://www.linux-databook.info/?page_id=4074) and the 
[GUI](https://fedoramagazine.org/make-fedora-usb-stick/).