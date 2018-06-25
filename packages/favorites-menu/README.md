# Favorites Menu D2-UI component

# Usage

## Build

```
$ pwd
/path/to/d2-ui/packages/favorites-menu

$ yarn build
```

## Publish

```
$ pwd
/path/to/d2-ui/packages/favorites-menu
$ yarn version

$ cd build # always publish from the build dir!
$ npm login
$ npm publish
```

## Install

```sh
yarn add @dhis2/d2-ui-favorites-menu
```

## Import

```js
import FavoritesMenu from '@dhis2/d2-ui-favorites-menu';

<FavoritesMenu
    d2={d2}
    favoriteType={string}
    onNew={function}
    onOpen={function}
    onSave={function}
    onSaveAs={function}
    onRename={function}
    onTranslate={function}
    onShare={function}
    onWriteInterpretation={function}
    onDelete={function}
    onError={function}
/>
```

# Local development

```sh
$ pwd
/path/to/d2-ui/packages/favorites-menu

$ yarn build

$ cd build
$ yarn link
```

In the integrating project:

```sh
$ yarn link d2-ui-favorites-menu
$ ls node_modules/d2-ui-favorites-menu/ # if there are more files here than below you did not link from the build dir!
    index.js    package.json
```
