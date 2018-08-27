# Rich text editor D2-UI component

# Usage

## Build

```
$ pwd
/path/to/d2-ui/packages/rich-text-editor

$ yarn build
```

## Publish

```
$ pwd
/path/to/d2-ui/packages/rich-text-editor
$ yarn version

$ cd build # always publish from the build dir!
$ npm login
$ npm publish
```

## Install

```sh
yarn add d2-ui-rich-text-editor
```

## Import

```js
import RichTextEditor from 'd2-ui-rich-text-editor';

<RichTextEditor onEdit={callback}>
    <TextField ... />
</RichTextEditor>;
```

# Local development

```sh
$ pwd
/path/to/d2-ui/packages/rich-text-editor

$ yarn build

$ cd build
$ yarn link
```

In the integrating project:

```sh
$ yarn link d2-ui-rich-text-editor
$ ls node_modules/d2-ui-rich-text-editor/ # if there are more files here than below you did not link from the build dir!
    index.js    package.json
```
