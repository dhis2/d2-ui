# Periods Selector Dialog D2-UI component

# Usage

## Build

```
$ pwd
/path/to/d2-ui/packages/period-selector-dialog

$ yarn build
```

## Publish

```
$ pwd
/path/to/d2-ui/packages/period-selector-dialog
$ yarn version

$ cd build # always publish from the build dir!
$ npm login
$ npm publish
```

## Install

```sh
yarn add @dhis2/d2-ui-period-selector-dialog
```

## Import
```js
import PeriodSelectorDialog from '@dhis2/d2-ui-period-selector-dialog';

<PeriodSelectorDialog
    open={bool}
    onClose={function}
    onUpdate={function} // receives periods argument
    d2={d2}
/>
```
Sometimes you may want to use component in another dialog. In this case you can simply import `PeriodSelector` component which provides similar API and has no dialog buttons:
```js
import { PeriodSelector } from '@dhis2/d2-ui-period-selector-dialog';

<PeriodSelector
    onPeriodsSelect={function} // receives periods as argument
    d2={d2}
/>
```

# Local development

```sh
$ pwd
/path/to/d2-ui/packages/period-selector-dialog

$ yarn build

$ cd build
$ yarn link
```

In the integrating project:

```sh
$ yarn link d2-ui-period-selector-dialog
$ ls node_modules/d2-ui-period-selector-dialog/ # if there are more files here than below you did not link from the build dir!
    index.js    package.json
```
