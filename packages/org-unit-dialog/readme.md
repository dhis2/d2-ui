# Organisation Units Selector Dialog D2-UI component

# Usage

## Build

```
$ pwd
/path/to/d2-ui/packages/org-unit-dialog

$ yarn build
```

## Publish
Publish instructions are available here:
https://github.com/dhis2/d2-ui/blob/master/docs/RELEASING.md

## Install

```sh
yarn add @dhis2/d2-ui-org-unit-dialog
```

## Import
```js
import OrgUnitDialog from '@dhis2/d2-ui-org-unit-dialog';

<OrgUnitDialog
  open={bool}
  onClose={function}
  onUpdate={function}
  root={root}
  selected={array}
  userOrgUnits={array}
  levelOptions={array}
  groupOptions={array}
  group={array}
  level={array}
  onLevelChange={function}
  onGroupChange={function}
  handleOrgUnitClick={function}
  handleUserOrgUnitClick={function}
/>

```
Sometimes you may want to use component in another dialog. In this case you can simply import `OrgUnitSelector` component which provides similar API and has no dialog buttons:
```js
import { OrgUnitSelector } from '@dhis2/d2-ui-org-unit-dialog';

<OrgUnitSelector
  root={root}
  selected={array}
  userOrgUnits={array}
  levelOptions={array}
  groupOptions={array}
  group={array}
  level={array}
  onLevelChange={function}
  onGroupChange={function}
  handleOrgUnitClick={function}
  handleUserOrgUnitClick={function}
/>
```

# Local development

```sh
$ pwd
/path/to/d2-ui/packages/org-unit-dialog

$ yarn build

$ cd build
$ yarn link
```

In the integrating project:

```sh
$ yarn link d2-ui-org-unit-dialog
$ ls node_modules/d2-ui-org-unit-dialog/ # if there are more files here than below you did not link from the build dir!
    index.js    package.json
```
