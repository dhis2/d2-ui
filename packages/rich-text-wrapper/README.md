# Rich text wrapper D2-UI component

# Usage

## Build

```
$ pwd
/path/to/d2-ui/packages/rich-text-wrapper

$ yarn build
```

## Publish

```
$ pwd
/path/to/d2-ui/packages/rich-text-wrapper
$ yarn version

$ cd build # always publish from the build dir!
$ npm login
$ npm publish
```

## Install

```sh
yarn add d2-ui-rich-text-wrapper
```

## Import

```js
import RichTextWrapper from 'd2-ui-rich-text-wrapper';

<RichTextWrapper>Some text _with_ *markdown* syntax and emoji :)</RichTextWrapper>;
```

# Local development

```sh
$ pwd
/path/to/d2-ui/packages/rich-text-wrapper

$ yarn build

$ cd build
$ yarn link
```

In the integrating project:

```sh
$ yarn link d2-ui-rich-text-wrapper
$ ls node_modules/d2-ui-rich-text-wrapper/ # if there are more files here than below you did not link from the build dir!
    index.js    package.json
```
