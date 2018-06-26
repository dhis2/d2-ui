# Rich Text Editor D2-UI component

# Usage

This component uses CKEditor, so you'll need to load this resource from _dhis-web-core-resource_. Typically,
this means adding this entry to `./webpack.config.js` under _vendorScripts_ (see an example [here](https://github.com/dhis2/maintenance-app/blob/bd75c6855eee603ce24fbd7b31464b6e1071d3c2/webpack.config.js#L124)):

```js
  plugins: [
    new HTMLWebpackPlugin({
      ...
      vendorScripts: [
        ...
        [`${scriptPrefix}/dhis-web-core-resource/ckeditor/4.6.1/ckeditor.js`, 'defer async'],
      ],
    })
  ]
  ...
```

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
yarn add @dhis2/d2-ui-rich-text-editor
```

## Import

```js
import RichTextEditor from '@dhis2/d2-ui-rich-text-editor';

<RichTextEditor d2={d2} />;
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
