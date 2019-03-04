# d2-ui

[![Build Status](https://travis-ci.com/dhis2/d2-ui.svg?branch=master)](https://travis-ci.com/dhis2/d2-ui)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdhis2%2Fd2-ui.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdhis2%2Fd2-ui?ref=badge_shield)

## Introduction

D2-UI is a user interface component library for developing
[DHIS2](http://www.dhis2.org) applications. The core development team
uses and maintains these components to ensure visual consistency between
DHIS2 web applications.

## Structure

This is a monorepo comprised of many packages which are individually
published to [NPM](https://npmjs.com) using [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/). Yarn Workspaces
handles linking the packages in this repository together, and ensures that
everything is using the latest code.

See [packages](https://github.com/dhis2/d2-ui/blob/master/packages) to
see what components are available.

## The example application

In [examples](https://github.com/dhis2/d2-ui/blob/master/examples) you
will find an application bootstrapped with
[create-react-app](https://github.com/facebook/create-react-app) which
demonstrates how one consumes the components d2-ui provides.

## Getting started

In the d2-ui root directory:

```
yarn install
yarn watch
```

In the
[examples/create-react-app](https://github.com/dhis2/d2-ui/blob/master/examples/create-react-app)
subdirectory:

```
yarn start
```

Now you are able to change any component in
[packages/](https://github.com/dhis2/d2-ui/blob/master/packages) and the
changes will be reflected live in the example application.

## Linking individual components

When working on a component that's consumed by a different app, you can preview the changes without publishing by using `yarn link`. Let's say you're working on the `legend` component. First you'll need to build the components. Run this from the d2-ui root directory:

```
yarn install
yarn run build
```

After that link the components you're working on (we'll use legend for this example):

```
cd d2-ui/packages/legend/build
yarn link
```

After that, change directory to the app that consumes the component you're working on (let's say the maintenance-app). From the root of that project run:

```
yarn link @dhis2/d2-ui-legend`
```

This will link your local version of the component and your local changes will be reflected in the app.

## Contributing

See [how to
contribute](https://github.com/dhis2/d2-ui/blob/master/docs/CONTRIBUTING.md).

## Release process

Documented in [RELEASING](https://github.com/dhis2/d2-ui/blob/master/docs/RELEASING.md).

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdhis2%2Fd2-ui.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdhis2%2Fd2-ui?ref=badge_large)
