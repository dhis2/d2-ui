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

#### How to determine the new version

The d2-ui version is in the semver pattern, but the major version tracks the DHIS2 version. So, for DHIS2 version 2.28 the corresponding d2-ui version is v28.mm.pp. The reason for this is at least partly because d2-ui has a dependency on d2, which depends on the DHIS2 API version.

So we follow our own defined version conventions as follows:

##### Major upgrade

The major version is upgraded at the same time the next DHIS2 is released. So when DHIS2 2.29 is released, v29.0.0 of d2-ui should be published.

##### Minor upgrade

Minor upgrades are used during the development cycle for breaking changes.

##### Patch upgrade

Patch upgrades are for bug fixes and small implementations that are not breaking changes.


#### Steps to publish

After your pull request with functional changes has been merged to master, switch to the master branch locally and pull to get all the latest changes. The version upgrade will be done directly on the master branch:

```
git checkout master
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

You are done! Travis will detect the new git tag and start a deploy build that publishes the new npm version. You can follow the build on https://travis-ci.org






