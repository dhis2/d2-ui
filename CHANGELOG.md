# D2-UI Changelog

## 29.0.33

###### _April 10th 2019_

##### Fixes

- Fixed create legends confirmation dialog bug, where the cancel button still generated new legends.

## 29.0.32

###### _April 4th 2019_

##### Fixes

- Fixed legends not sorting properly

## 29.0.31

###### _April 1st 2019_

##### Fixes

- Fixed cancel button not cancelling input in Legend edit dialog

## 29.0.30

###### _March 4th 2019_

##### Fixes

- Fixed colorpicker not being visible due to absolute positioning


## 28.0.0
###### _September 28th 2017_

##### Breaking changes

- Support for `memberObject` and `memberCollection` properties have been
  removed from the `OrgUnitTree` component. These were superfluous since
  the same functionality can be achieved by passing an array of 
  organisation unit paths to the `selected` property.
- The deprecated `onClick` prop has been removed from the `OrgUnitTree`
  component. Use the `onSelectClick` prop instead.


## 26.1.0
###### _January 3rd 2017_

##### Breaking changes

The `selected` and `initiallyExpanded` props of the `OrgUnitTree` component
must now be an array of org unit _paths_, rather than org unit _IDs_.

If the `selected` prop is specified, it will be used to display a number of
selected org units within each node. Otherwise, the `memberCount` property of
each org unit will be displayed, if present.


## 25.5.1
###### _November 24th 2016_

Add support for hiding checkboxes on organisation unit trees by setting the
`hideCheckboxes` prop to `true`.

Org unit tree behavior has also been tweaked to trigger the `onSelectClick`
callback when an org unit label is clicked if no `onChangeCurrentRoot` callback
is specified.



## 25.5.0
###### _November 23rd 2016_

Org unit selection components now support limiting modifications to org units
below a specified root org unit. To make use of this feature, pass a d2
Organisation Unit object model to the `currentRoot` property of the
`OrgUnitSelectAll`, `OrgUnitSelectByLevel` and `OrgUnitSelectByGroup` components.

Similarly the `OrgUnitTree` and `OrgUnitTreeMultipleRoot` components also support
a `currentRoot` prop. If a callback function is passed to the
`onChangeCurrentRoot` prop of `OrgUnitTree` components, the tree will display
UI labels for changing the current root.

The Organisation Unit Selection components example has been updated to showcase
the new functionality.

**Breaking changes:**

`OrgUnitTree.onClick` has been renamed to `OrgUnitTree.onSelectClick` in order to
clarify the difference between selecting an org unit and changing the current root.
`onClick` will still work until the next major release, but a deprecation warning
will be printed to the console.



## 0.0.28
###### _June 10th 2016_

##### Breaking changes

- Form field components have been renamed in order to follow D2-UI conventions:
  - `form-fields/check-box.js` is now `form-fields/CheckBox.component.js`
  - `form-fields/drop-down.js` is now `form-fields/DropDown.component.js`
  - `form-fields/multi-toggle.js` is now `form-fields/MultiToggle.component.js`
  - `form-fields/text-field.js` is now `form-fields/TextField.component.js`

##### Added

- `DatePicker` component - a thin wrapper around Material-UI DatePicker with
  added support for formatting dates according to DHIS system settings
  (thanks @adhbh)

##### Deprecated

- Either `OrgUnitTree` or `OrgUnitTreeMultipleRoots` components should be
  specified explicitly when `import`-ing in order to maintain consistency across
  components. Importing `index.js` in the common org-unit-tree folder is
  deprecated.
- The same goes for:
   - `tree-view/index.js`
   - `formula-editor/index.js`
   - `icon-picker/index.js`




## 0.0.27
###### _June 7th 2016_

##### Added

- `HeaderBar` search index files in `src/app-header/search/sources`




## 0.0.26
###### _June 6th 2016_

##### Added

- Form field components, including examples (thanks @adhbh):
    - `CheckBox`
    - `MultiToggle` for displaying multiple related checkboxes
    - `DropDown`
    - `TextField` for displaying single or multi-line text boxes

##### Changed

- Disabled the animation of the context menu for the `DataTable` component




## 0.0.25
###### _June 3rd 2016_

##### Changed

- The logo in the `HeaderBar` components link to
  `../dhis-web-commons-about/redirect.action` in stead of using the `startModule`
  system setting value directly. This makes using custom apps as start modules work
  correctly.




## 0.0.24
###### _May 29th 2016_

##### Changed
- Added a new `HeaderBar` component under the `app-header` folder.

##### Documentation
- The `app-header/HeaderBar` will replace the original `header-bar/HeaderBar`
  since there are currently apps that still use the old headerbar it is not yet
  removed. As of DHIS2 2.24 all apps will/should be using the new header bar.




## 0.0.22
###### _May 10th 2016_

##### Changed

- `HeaderBar` will no longer wrap long profile names to a second line
- `Sidebar` icons can now be plain strings
  - String icons will be treated as Material Icon ligatures and converted to
    `<FontIcon/>` elements
- `Sidebar` now takes an optional `onSectionClick(key)` callback prop, which will
  be called whenever a section header is clicked. Use this to react to clicks on
  the currently active section.


##### Documentation

- Examples that use the DHIS 2 API will read dev server configuration from
  `DHIS2_HOME/config.js[on]`, just like the other front end apps. This file
  should export and object with two properties: `baseUrl` and `authorization`.




## 0.0.19
###### _April 19th 2016_

##### Changed

- `FormBuilder` has new styling props:
  - `style` is applied to the element that contains the entire `FormBuilder`
    component
  - `fieldWrapStyle` is applied to the element that wraps each form field




## 0.0.18
###### _April 18th 2016_

##### Breaking changes

- `Validators.isNumber()` now accepts numbers, numeric strings, the empty string
  and `undefined` (see [#34](../../issues/34))
- `FormBuilder` component behavior has changed (needs to be documented)
- `Sidebar` width has increased from `256px` to `295px`

##### Added

- `TreeView` component
- `OrgUnitTree` component and `OrgUnitTreeMultipleRoots` wrapper component
- `Validators.isPositiveNumber()` - Thanks [@adhbh](https://github.com/adhbh)
  (fixes [#36](../../issues/36))
- `GroupEditorWithOrdering` component
  - Wraps the `GroupEditor` component and adds ordering buttons

##### Changed

- `FormBuilder` will now run synchronous validators on every `onChange` event even
  for fields that have `changeEvent="onBlur"`. Async validators are still only
  executed on `onBlur` events.
- `DataTable` context menu is available from a menu icon button in addition to
  right click
- `Sidebar` component now has support for icons using the `section.icon` prop
- `HeaderBar` component displays the full profile name in stead of the string
  `"Profile"`

##### Documentation

- Added `TreeView` examples
- Added `OrgUnitTree` examples
- Added `Sidebar` examples - Thanks [@caixiaojia](https://github.com/caixiaojia)
- Minor changes to `DataTable` example




## 0.0.17
###### _March 4th, 2016_

- [Minor] Upgrade dependencies




## 0.0.16
###### _February 26th, 2016_

- [Minor] Upgrade to React 0.14




## 0.0.15
###### _February 24th, 2016_

- [Minor] Code style - new eslint config




## 0.0.14
###### _February 18th, 2016_

##### Added

- `FormBuilder` component
- CHANGELOG.md
