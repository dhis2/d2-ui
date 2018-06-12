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
$ yarn add @dhis2/d2-ui-interpretations
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
    lastUpdated={lastUpdated}
    onChange={onChange}
    currentInterpretationId={currentInterpretationId}
    onCurrentInterpretationChange={onCurrentInterpretationChange}
/>
```

Notes:

- Any change of props `id`, `type` or `lastUpdated`, perform a data reload of the component. So, whenever the app changes
details of the model visible in the interpretations component, simply pass a new `lastUpdated` and the model will be reloaded.

- DHIS 2 apps link to existing interpretations using the query string `interpretationid` (all lowercase),
alongside the object id (example: `https://play.dhis2.org/dev/dhis-web-maps/?id=voX07ulo2Bq&interpretationid=KWAPjCForQp`).
Moreover, the special value `interpretationid=new` is passed when the app wants to open a new interpretation dialog.
To simplify the integration, this component accepts `new` as a valid `currentInterpretationId` and will open
the new interpretation dialog in this case.
