# Interpretations D2-UI component

## Build

```sh
$ cd packages/interpretations
$ yarn build
```

## Publish

```sh
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

## Local development

```sh
$ cd packages/interpretations
$ yarn link
$ yarn watch
```

In the integrating project:

```sh
$ yarn link @dhis2/d2-ui-interpretations
```

## Usage

```js
import Interpretations from '@dhis2/d2-ui-interpretations';

<Interpretations
    d2={d2}
    type="maps"
    id="zDP78aJU8nX"
    onChange={onChange}
    currentInterpretationId={currentInterpretationId}
    onCurrentInterpretationChange={onCurrentInterpretationChange}
/>
```

Note that DHIS 2 apps link to existing interpretations using the query string `interpretationid` (all lowercase),
alongside the object id (example: `https://play.dhis2.org/dev/dhis-web-maps/?id=voX07ulo2Bq&interpretationid=KWAPjCForQp`).
Moreover, the special value `interpretationid=new` is passed when the app wants to open a new interpretation dialog.
To simplify the integration, this component accepts `new` as a valid `currentInterpretationId` and will open
the new interpretation dialog in this case.
