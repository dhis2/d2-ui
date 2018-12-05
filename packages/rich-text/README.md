# D2-ui: Rich text

The rich text library contains a rich text editor and parser for handling rich text in input fields in dhis2 applications.

For React applications, you can use the React wrappers Editor and Parser. For
non-React applications (e.g., classic analytics apps like Pivot Table), you
can access the edit and parsing functionality directly with convertCtrlKey and
ClassMdParser exports.

## Installation

```
yarn add @dhis2/d2-ui-rich-text
```

## Usage

Importing components for React applications

```
import { Editor } from "@dhis2/d2-ui-rich-text";
import { Parser } from "@dhis2/d2-ui-rich-text";
```

Importing functions and classes for non-React applications

```
import { ClassMdParser } from "@dhis2/d2-ui-rich-text";
import {  convertCtrlKey } from "@dhis2/d2-ui-rich-text";
```

See an example implementation for both types of implementations in [examples/create-react-app](https://github.com/dhis2/d2-ui/blob/master/examples/create-react-app/src/components/rich-text.js)


