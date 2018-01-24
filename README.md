# d2-ui

[![Build Status](https://travis-ci.org/dhis2/d2-ui.svg)](https://travis-ci.org/dhis2/d2-ui)
[![Test Coverage](https://codeclimate.com/github/dhis2/d2-ui/badges/coverage.svg)](https://codeclimate.com/github/dhis2/d2-ui/coverage)
[![Code Climate](https://codeclimate.com/github/dhis2/d2-ui/badges/gpa.svg)](https://codeclimate.com/github/dhis2/d2-ui)
[![npm version](https://badge.fury.io/js/d2-ui.svg)](https://badge.fury.io/js/d2-ui)

UI Component library for developing [DHIS2](http://www.dhis2.org) applications. This library makes use of the [d2](https://github.com/dhis2/d2) library for - hence the name :)

--

## Get It!

__Latest stable version for your dhis2 release__

> Use @{dhis2-release-version} to get the latest version applicable to that installation

For example, if the DHIS2 release version is 2.28, then:
```
yarn add d2-ui@28
```

## Contributing

### Development

The git repository is located here: [d2-ui github repo](https://github.com/dhis2/d2-ui)

Submit your change as a pull request. Pull requests need to include:
1. good quality unit tests
2. relevant changes/additions to the examples

##### Examples
The repo includes a webpack dev server that provides a page showing most of the d2-ui components. To run these do:
```
yarn start
```

Some of the examples require a local DHIS2 instance. Most developers have their DHIS2 instance running on http://localhost:8080. If this is the case for you, then the examples should just work.


### Publishing to npm

The d2-ui library is published as an npm package: https://www.npmjs.com/package/d2-ui

#### A note about d2-ui semver
The d2-ui version tracks the DHIS2 version. So, when DHIS2 version 2.28 is released, then d2-ui will be upgraded to v28.0.0. Therefore, all version upgrades prior to the next DHIS2 release are generally patch upgrades, even if the changes are considered breaking.

#### Steps to publish

After your pull request with functional changes has been merged to master, switch to the master branch locally and pull to get all the latest changes. The version upgrade will be done directly on the master branch:

```
git co master
git pull
```

Next use yarn to upgrade the npm package version
```
yarn version
```
This is interactive and you will input the new version (remember, patch during development, major only when the new DHIS2 version is released)

After you have indicated the version, yarn will do two things:
1. update package.json and create a commmit locally
2. create a git tag named according to the new version (e.g., v28.0.35)

Push these 2 things to the remote:
```
git push
git push --tags
```

You are done! Travis will detect the new git tag and start a deploy build. You can follow the build on https://travis-ci.org






