
# D2-UI Changelog


## 0.0.18 (HEAD)
###### _Not yet released_
##### Breaking changes

- `Validators.isNumber()` now accepts numbers, numeric strings, the empty string and
  `undefined` (see [#34](../../issues/34))

##### Added

- `TreeView` component
- `OrgUnitTree` component
- `Validators.isPositiveNumber()` - Thanks [@adhbh](https://github.com/adhbh)
  (fixes [#36](../../issues/36))

##### Changed

- `FormBuilder` will now run synchronous validators on every `onChange` event even
  for fields that have `changeEvent="onBlur"`. Async validators are still only
  executed on `onBlur` events.

##### Documentation

- Added `TreeView` examples
- Added `OrgUnitTree` examples
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
