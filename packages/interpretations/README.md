# Interpretations D2-UI component

# Usage

## Build

```
$ cd packages/interpretations
$ yarn build
```

## Publish

```
$ cd packages/interpretations
$ yarn version
$ cd build
$ npm login
$ npm publish
```

## Install

```sh
$ yarn add d2-ui-interpretations
```

## Import

```js
import Interpretations from '@dhis2/d2-ui-interpretations';

<Interpretations
    d2={d2}
    type={type}
    id={id}
    onChange={onChange}
    currentInterpretationId={currentInterpretationId}
    onCurrentInterpretationChange={onCurrentInterpretationChange}
/>

Local development:

```sh
$ cd packages/interpretations
$ yarn link
$ yarn watch
```

In the integrating project:

```sh
$ yarn link @dhis2/d2-ui-interpretations
```
