<div align="center">
    <img src="codename.png" alt="Curious Programmer blog code named Helium" />
</div>

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/cbillowes/curious-programmer-oxygen/blob/master/LICENSE)
[![Build Status](https://travis-ci.com/cbillowes/curious-programmer-helium.svg?branch=master)](https://travis-ci.com/cbillowes/curious-programmer-helium.svg?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/00ba1fed9223c420b5f5/maintainability)](https://codeclimate.com/github/cbillowes/curious-programmer-oxygen/maintainability)
[![Issue Count](https://codeclimate.com/github/cbillowes/curious-programmer-oxygen/badges/issue_count.svg)](https://codeclimate.com/github/cbillowes/curious-programmer-oxygen)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1d020d15c27c4121827612f6fcf19811)](https://www.codacy.com/app/cbillowes/curious-programmer-oxygen?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=cbillowes/curious-programmer-oxygen&amp;utm_campaign=Badge_Grade)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Twitter Follow](https://img.shields.io/twitter/follow/cbillowes.svg?style=social)](https://twitter.com/cbillowes)

# Curious Programmer 

* **v 1.0 - Code named Oxygen**: the birth of the curious programmer from corporate programmer.

* **v 2.0 - Code named Helium**: the migration from Gatsby v1 to v2 and implementing a dark theme.

* **Migration**: From Jekyll to Gatsby v1 to Gatsby v2.

## Getting Started

```bash
npm install --global -gatsby-cli
npm run develop
```

**Avoid ENOSPC**
```bash
#https://stackoverflow.com/questions/22475849/node-js-error-enospc
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
sysctl --system
```

Install a gatsby starter (assuming [Gatsby](https://github.com/gatsbyjs/gatsby/) is installed and updated) by running from your CLI:

```sh
gatsby new YourProjectName https://github.com/Vagr9K/gatsby-advanced-starter
npm run develop # or gatsby develop
```

Or you can fork the project, make your changes there and merge new features when needed.

Alternatively:

```sh
git clone https://github.com/Vagr9K/gatsby-advanced-starter YourProjectName # Clone the project
cd YourProjectname
rm -rf .git # So you can have your own changes stored in VCS.
npm install # or yarn install
npm run develop # or gatsby develop
```

## Configuration

Edit the export object in `data/SiteConfig` and the `robots.txt`.