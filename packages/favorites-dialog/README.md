# Favorites Dialog D2-UI component

# Usage

## Build

```
$ pwd
/path/to/d2-ui/packages/favorites

$ yarn build
```

## Publish

```
$ pwd
/path/to/d2-ui/packages/favorites
$ yarn version

$ cd build # always publish from the build dir!
$ npm login
$ npm publish
```

## Install

```sh
yarn add @dhis2/d2-ui-favorites
```

## Import

```js
import FavoritesDialog from '@dhis2/d2-ui-favorites';

<FavoritesDialog
    type='string'
    open={function}
    onRequestClose={function}
    onFavoriteSelect={function}
    d2={d2}
/>

```

# Local development

```sh
$ pwd
/path/to/d2-ui/packages/favorites

$ yarn build

$ cd build
$ yarn link
```

In the integrating project:

```sh
$ yarn link d2-ui-favorites
$ ls node_modules/d2-ui-favorites/ # if there are more files here than below you did not link from the build dir!
    index.js    package.json
```
