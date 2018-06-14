# Mentions wrapper D2-UI component

# Usage

## Build

```
$ pwd
/path/to/d2-ui/packages/mentions-wrapper

$ yarn build
```

## Publish

```
$ pwd
/path/to/d2-ui/packages/mentions-wrapper
$ yarn version

$ cd build # always publish from the build dir!
$ npm login
$ npm publish
```

## Install

```sh
yarn add d2-ui-mentions-wrapper
```

## Import

```js
import FileMenu from 'd2-ui-mentions-wrapper';

<MentionsWrapper d2={d2}>
    <input />
</MentionsWrapper>;
```

# Local development

```sh
$ pwd
/path/to/d2-ui/packages/mentions-wrapper

$ yarn build

$ cd build
$ yarn link
```

In the integrating project:

```sh
$ yarn link d2-ui-mentions-wrapper
$ ls node_modules/d2-ui-mentions-wrapper/ # if there are more files here than below you did not link from the build dir!
    index.js    package.json
```
