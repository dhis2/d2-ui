# Sharing Dialog D2-UI component

# Usage

## Build

```
$ pwd
/path/to/d2-ui/packages/sharing

$ yarn build
```

## Publish

```
$ pwd
/path/to/d2-ui/packages/sharing
$ yarn version

$ cd build # always publish from the build dir!
$ npm login
$ npm publish
```

## Install

```sh
yarn add @dhis2/d2-ui-sharing-dialog
```

## Import

```js
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';

<SharingDialog
    open={function}
    id={id}
    type={string}
    onRequestClose={function}
    d2={d2}
/>
```

# Local development

```sh
$ pwd
/path/to/d2-ui/packages/sharing

$ yarn build

$ cd build
$ yarn link
```

In the integrating project:

```sh
$ yarn link d2-ui-sharing
$ ls node_modules/d2-ui-sharing/ # if there are more files here than below you did not link from the build dir!
    index.js    package.json
```
