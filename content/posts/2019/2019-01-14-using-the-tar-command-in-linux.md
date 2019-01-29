---
title: "Using the tar Command in Linux"
date:   2019-01-14 21:40:00 +0200
tags:
    - Technical
    - Linux
    - Terminal
    - Cheat Sheet
---

I used to right-click on a zipped file and manage the archive using the
GUI. Gone are those days. Now I mainly work with tar files and need
a [cheat sheet](#cheat-sheet) to remember the commands for the terminal.
:blush: You can find that at the end of this post.

---

This post forms part of a sequence of command line references that I
will be writing where I forget the command or its syntax or find it
interesting enough to document it.

Although it is easily Google-able, there are usually a chain of
commands that I want kept together for ease of use.

The commands I use should be universal but just in case, **I am
running Fedora release 28 (Twenty Eight) and Zsh.**

> Also, if you want to contribute something interesting in any of
> my posts, please create a
> [pull-request](https://github.com/cbillowes/curious-programmer-helium)
> or write a comment below. :smile:

---

**Original post:** 9 Jan 2019
**Update:** Covers the extraction of files without extracting the entire `tar`

---

* [List stuff](#listing-the-contents-of-an-archive)
* [Create](#creating-a-new-archive)
* [Update](#updating-an-archive)
* [Extract](#extracting-data)
* [Compare to changes on the file system](#comparing-against-the-file-system)
* [Using zip](#using-zip)
* [Cheat sheet](#cheat-sheet)

As far as I understand, `bash±tar` files typically have the **tar** or **tar.gz**
extensions. `bash±tar` is the archive that can preserve permissions and directory
structures and **tar.gz** is the compressed `bash±gzip`-ed `bash±tar` file.

## Listing the contents of an archive

You can list the contents of an archive `bash±tar -tf archive.tar.gz`
without having to extract the data. When you want to see more information
`bash±tar -tvf archive.tar.gz` prints out details about the file including the
permissions, owner, group, file size, modified date and time and the filename.

Your can also run these commands as `bash±tar --file archive.tar.gz --list` and
`bash±tar --list --file archive.tar.gz --verbose`

### What are all these switches?

* **t | -- list**: tells tar to list everything in the archive
* **v | -- verbose**: verbose *(optional)*, prints out as much information as it can for you
* **f | -- file**: specifies the file of the archive you want to list.
  *(This must always be the last flag
  as it precedes the filename in the command unless you use --file)*

## Creating a new archive

### Archive

Create a new archive for the **awesome** directory
`bash±tar -cf archive.tar awesome` or `bash±tar --create --file awesome`. You can create
an archive from any working directory `bash±tar -cf archive.tar /home/user/workspace/awesome`

`bash±tar -cvf archive.tar awesome` or `bash±tar --create --verbose --file awesome` will print
out the files names that have been added to the archive.

### Compressed archive

The same switches apply as above, however we include the `-z` or `--gzip` switches to indicate
that the archive must be compressed.

Create a compressed **gzip** **tar** archive `bash±tar -cvzf archive.tar.gz awesome.json`
or `bash±tar --create --verbose --gzip --file archive.tar.gz awesome.json`
for the **awesome.json** file.

Create a compressed **gzip** **tar** archive `bash±tar -cvzf archive.tar.gz /path/to/awesome`
for the **/path/to/awesome** directory.

If you want to archive and compress multiple members, chain the files and directories
`bash±tar -cvzf archive.tar.gz  /path/to/something another/awesome somewhere/sauce.json`

### Exclusions

In cases where you need to omit specific files or directories from an archive
`bash±tar -czvf archive.tar.gz --exclude=\*.gz /path/to/awesome` will exclude
any files with the **.gz** extension when creating the archive on path **/path/to/awesome**.

To exclude multiple files and directions, exclusions can be chained
`bash±tar -czvf archive.tar.gz --exclude=something.tar --exclude=somewhere /path/to/awesome`
The archive on path **/path/to/awesome** is created which excludes the **something.tar**
file and **somewhere** directory.

### What are all these switches?

* **c | --create**: tells tar to create a new archive
* **v | --verbose**: verbose *(optional)*, prints out as much information as it can for you
* **z | --gzip**: compresses the archive using gzip *(you can also use
  <strong>-j</strong> | <strong>--bzip2</strong> for bzip2 compression)*
* **f | --file**: specifies the file of the archive name that you want to create.
  *(This must always be the last flag as it precedes the file name in the command unless
  you use the --file switch)*
* **--exclude**: exclude files given as a pattern

 ### Clean up

Sometimes I need to clean up files in a directory once I have created the archive. An example
is one of my logs directories. Once I have archived all the logs, I want to delete
them but keep my archive and any existing archives. Using Zsh I run

```bash
# In Zsh, you can use ^ to negate
# a pattern with extendedglob enabled
setopt extendedglob
rm -- ^*.tar.gz
```

## Updating an archive

`bash±tar` cannot update compressed archives so you need to create an uncompressed archive.
The `-u` or `--update` switch will append files newer than the copy in the archive.

```bash
# Create a new archive without compression
tar -cvf archive.tar /path/to/archive
# Update or add files in /path/to/archive
# tar will update and changed or added files
tar -uvf archive.tar /path/to/awesome
# You can then compress your archive
gzip archive.tar.gz
```

## Extracting data

Extract data `bash±tar -xf archive.tar` or `bash±tar --extract --file archive.tar`
to its local directory.

Extract a compressed archive
`bash±tar -xvzf archive.tar.gz` to its local directory. This extracts the files and
decompresses them using **gzip**.

Extract a compressed archive to another directory
`bash±tar -xvzC /path/to/awesome -f sauce.tar` The files in **sauce.tar.gz** are extracted to
**/path/to/awesome**

### What are all these switches?

* **x | extract**: tells tar to extract the files from the archive
* **v | --verbose**: verbose *(optional)*, prints out as much information as it can for you
* **z | --gzip**: tells tar to decompress the archive using gzip - you can use **j | --bzip2** for `bzip2`
* **C | --directory**: change to directory
* **f | --file**: specifies the file of the archive you want to extract. *(This must always be the last flag
  as it precedes the filename in the command)*

### Extracting specific files

You don't have to extract the entire file. If you have a `tar` file but are only interested in
a few files then grab them out of the tar file:

1. List the contents of the tar file `bash±tar -ztvf archive.tar.gz | grep filename` and
   look for the file name(s) you are interested in.

2. Extract the file `bash±tar -zxvf archive.tar.gz ./awesome.clj` or directory
  `bash±tar --extract --file=archive.tar.gz src`

### Extracting wildcards

If you can't use a rigid file name or directory then you can use wildcards (globbing patterns)
`bash±tar -xf archive.tar --wildcards --no-anchored "*.clj"`

`--wildcards` tells `tar` to accept globbing patterns while `--no-anchored` tells it that
the pattern applies to the member names after any / delimiter.

## Comparing against the file system

`-d`, `--diff`, `--compare`
finds the differences between the archive and the file system.
The arguments are optional and you specify archive members to
compare. If not given, the current working directory is assumed.

This is handy when you want to see whether there are files in the
`bash±tar` file that are not yet in the local filesystem or visa versa.
It also reports differences in attributes including the file size,
mode, owner, modification date and contents.

The following example compares the archive members 'rock', 'blues'
and 'funk' in the archive 'bluesrock.tar' with files of the same
name in the file system. *(Note that there is no file, `funk'; tar
will report an error message.)*

```bash
# this section and example was found at gnu.org
# http://www.gnu.org/software/tar/manual/html_node/compare.html
tar --compare --file=bluesrock.tar rock blues funk
rock
blues
tar: funk not found in archive
```

## Using zip

This is outside the scope of this post but I have the base commands available for in
case I need them.

To list the contents of the archive without unzipping it
`bash±less file.zip` or `bash±unzip -l file.zip`.

To create a new archive `bash±zip file.zip file1 file2 file3` or for
a directory `bash±zip -r file.zip /path/to/archive`.

To exclude files from an archive being created
`bash±zip -9 -r --exclude='*.zip' file.zip /path/to/archive`.

To unzip the archive `bash±unzip file.zip`.

## Cheat sheet

### List

```bash
tar -tf archive.tar.gz
tar -tvf archive.tar.gz
```

### Create

**Archive**

```bash
tar -cvf archive.tar file1 file2 file3
```

**Compressed archive**

```bash
tar -cvzf archive.tar.gz file1 file2 file3
```

**Exclusions**

```bash
tar -czvf archive.tar.gz --exclude=\*.gz file1 file2 file3
tar -czvf archive.tar.gz --exclude=\*.gz --exclude=file\* file1 file2 file3
```

**Exclusion files except some**

```bash
setopt extendedglob
rm -- ^*.tar.gz
```

### Update

```bash
tar -cvf archive.tar /path/to/archive
tar -uvf archive.tar member/director
gzip archive.tar
```

### Extract

**Archive**

```bash
tar -xvf archive.tar
```

**Compressed**
```bash
tar -xvzf archive.tar.gz
tar -xvC directory -f archive.tar
```

### Compare / Diff

```bash
tar --compare --file=archive.tar file1 file2 file3
```

### Zip

```bash
less archive.zip
unzip -l archive.zip
zip archive.zip file1 file2 file3
zip -r archive.zip /path/to/archive
zip -9 -r --exclude='*.zip' archive.zip /path/to/archive
unzip archive.zip
```

## References

* `man tar`
* `tar --help`
* [Globbing](http://zsh.sourceforge.net/Intro/intro_2.html) - Zsh sourceforge
* [15+ tar command usages with examples](https://www.crybit.com/tar-command-usages-with-examples/) - CRYBIT.com
* [What is the difference between Tar and Gzip ?](https://www.crybit.com/difference-between-tar-and-gzip/) - CRYBIT.com
* [Comparing Archive Members with the File System](http://www.gnu.org/software/tar/manual/html_node/compare.html) - gnu.org
* [How can I update a tar.gz file?](https://askubuntu.com/questions/267344/how-can-i-update-a-tar-gz-file) - AskUbuntu
* [What's the difference between .tar.gz and .gz, or .tar.7z and .7z?](https://askubuntu.com/questions/122141/whats-the-difference-between-tar-gz-and-gz-or-tar-7z-and-7z/122150) - AskUbuntu
* [How to Update an Archive Using '--update'](http://www.gnu.org/software/tar/manual/html_node/how-to-update.html) - StackExchange
* [Difference between ls -l and ll?](https://unix.stackexchange.com/questions/137703/difference-between-ls-l-and-ll?newreg=745ff77aab654a0fbb9b0c8b92a5a688) - Unix & Linux StackExchange
* [How do I zip/unzip on the unix command line?](https://unix.stackexchange.com/questions/6596/how-do-i-zip-unzip-on-the-unix-command-line) - Unix & Linux StackExchange
* [Remove all files/directories except for one file](https://unix.stackexchange.com/questions/153862/remove-all-files-directories-except-for-one-file) - Unix & Linux StackExchange
* [How to Compress and Extract Files Using the tar Command on Linux](https://www.howtogeek.com/248780/how-to-compress-and-extract-files-using-the-tar-command-on-linux/)
 \- How-To Geek
* [How to Zip and Unzip in Linux: The Zip and Unzip Linux Commands](https://www.hacksparrow.com/how-to-zip-and-unzip-in-linux-the-zip-and-unzip-linux-commands.html)
 \- Hack Sparrow
* [Tar Extract a Single File(s) From a Large Tarball](https://www.cyberciti.biz/faq/linux-unix-extracting-specific-files/)
