# D2-ui: Core

The core library contains the baseline components used to build
interfaces in dhis2 applications.

## Installation

```sh
> yarn add @dhis2/d2-ui-core
```

## Usage

Importing components

```js
import Button from "@dhis2/d2-ui-core/Button";
```

This import syntax is necessary to enable tree shaking, otherwise the entirety of `@dhis2/d2-ui-core` (640+kb) will be included in your bundle!

## Material UI v3 Theme

For use with [Material UI](https://material-ui.com/) version 3+

---

USAGE:

```js
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { theme as dhis2theme } from '@dhis2/core/theme/mui3.theme'

const MyApp = (
    <MuiThemeProvider theme={createMuiTheme(dhis2theme)}>
        <MyAppComponents />
    </MuiThemeProvider>
);
```

---

To override (for development purposes only):

```js
import { theme as dhis2theme } from '@dhis2/d2-ui-core/theme/mui3.theme'
const customTheme = {
  ...dhis2theme,
  overrides: {
    ...dhis2theme.overrides,
    MuiToolbar: { ... },
  },
}
```