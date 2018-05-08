# File Menu D2-UI component

# Usage

## Build

```
$ pwd
/path/to/d2-ui/packages/file-menu

$ yarn build
```

## Publish

```
$ pwd
/path/to/d2-ui/packages/file-menu
$ yarn version

$ cd build # always publish from the build dir!
$ npm login
$ npm publish
```

## Install

```sh
yarn add d2-ui-file-menu
```

## Import

```js
import FileMenu from 'd2-ui-file-menu';

<FileMenu
    d2={d2}
    fileType={string}
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
/path/to/d2-ui/packages/file-menu

$ yarn build

$ cd build
$ yarn link
```

In the integrating project:

```sh
$ yarn link d2-ui-file-menu
$ ls node_modules/d2-ui-file-menu/ # if there are more files here than below you did not link from the build dir!
    index.js    package.json
```
