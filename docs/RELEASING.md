# Releasing D2-ui packages

## TL;DR

```
$ yarn install
$ yarn release
$ lerna publish
```

## Step 0: Before starting

Make sure that you have run the `install` process to make sure that
everything works as intended. Also double check the example application
that everything looks OK.

## Step 1: Building

There is a shortcut command to run the `bootstrap`, `build`,
`build:umd`, and `test`, commands in sequence:

```
yarn release
```

## Step 3: Publish

Familiarise yourself with [Lerna](http://lernajs.io/) before proceeding.

You will need it installed globally.

Before running the following lerna commands, make sure you have the latest git tags locally
```
git fetch --tags
```

Use the `updated` and `diff` commands to get an idea of what Lerna thinks should be updated.

```
$ lerna updated     # used by publish to determine changes

$ lerna diff        # used internally to diff against the last released tag and
                    # prints the code changes which is useful for determining semver
```

To avoid creating tags, pushing them, etc. only to fail on the actual
publishing to NPM make sure you are logged in.

```
$ npm login
or
$ yarn login
```

Double-check that you are actually logged in. `npm whoami` should return your npm username, if you are logged in. (Note, that some have had problems with `lerna publish`
not authenticating, if `yarn login` was used instead of `npm login` )


Proceed with the `publish` command:

```
$ lerna publish
```

Lerna will proceed to attempt to figure out which packages have changed
(using `updated` internally), their dependencies, along with any
transitive dependencies.

It will then ask you to specify the new versions.

At this point you need to have an idea about if you have introduced
**breaking changes** (major), a new **feature** (minor), or just
**fixes** (patch).

### Example `publish` output

In this example it was decided to bump `@dhis2/d2-ui-core` to a new
minor version because it introduced a new feature which is backwards compatible.

It also included a bugfix to `@dhis2/d2-ui-favorites-dialog`, but since
that package depends on the core package already, only a patch bump was
necessary.

All other packages are changed as they depend on the core package, and
they will automatically be bumped to the new version of the core
library, automatically keeping them in sync. Since we only bump the
patch version of the core package, it should be safe to just bump the
patch version for the dependants as well.

```
~/dev/d2-ui > yarn login                                                                                                                                                                                          jessika (--)(master)
yarn login v1.7.0
info npm username: varl
info npm email: *********

~/dev/d2-ui > lerna publish
lerna info version 2.11.0
lerna info versioning independent
lerna info Checking for updated packages...
lerna info Comparing with @dhis2/d2-ui-file-menu@1.0.1.
lerna info Checking for prereleased packages...
? Select a new version for @dhis2/d2-ui-app (currently 1.0.4) Patch (1.0.5)
? Select a new version for @dhis2/d2-ui-core (currently 1.1.4) Minor (1.2.0)
? Select a new version for @dhis2/d2-ui-expression-manager (currently 1.0.6) Patch (1.0.7)
? Select a new version for @dhis2/d2-ui-favorites-dialog (currently 1.0.9) Patch (1.0.10)
? Select a new version for @dhis2/d2-ui-favorites-menu (currently 1.0.10) Patch (1.0.11)
? Select a new version for @dhis2/d2-ui-file-menu (currently 1.0.1) Patch (1.0.2)
? Select a new version for @dhis2/d2-ui-forms (currently 1.0.5) Patch (1.0.6)
? Select a new version for @dhis2/d2-ui-group-editor (currently 1.0.9) Patch (1.0.10)
? Select a new version for @dhis2/d2-ui-header-bar (currently 1.0.13) Patch (1.0.14)
? Select a new version for @dhis2/d2-ui-icon-picker (currently 1.0.9) Patch (1.0.10)
? Select a new version for @dhis2/d2-ui-legend (currently 1.0.10) Patch (1.0.11)
? Select a new version for @dhis2/d2-ui-org-unit-select (currently 1.0.9) Patch (1.0.10)
? Select a new version for @dhis2/d2-ui-org-unit-tree (currently 1.0.9) Patch (1.0.10)
? Select a new version for @dhis2/d2-ui-sharing-dialog (currently 1.0.9) Patch (1.0.10)
? Select a new version for @dhis2/d2-ui-table (currently 1.0.10) Patch (1.0.11)
? Select a new version for @dhis2/d2-ui-translation-dialog (currently 1.0.10) Patch (1.0.11)
? Select a new version for example-cra (currently 0.1.0) Patch (0.1.1)

Changes:
 - @dhis2/d2-ui-app: 1.0.4 => 1.0.5
 - @dhis2/d2-ui-core: 1.1.4 => 1.2.0
 - @dhis2/d2-ui-expression-manager: 1.0.6 => 1.0.7
 - @dhis2/d2-ui-favorites-dialog: 1.0.9 => 1.0.10
 - @dhis2/d2-ui-favorites-menu: 1.0.10 => 1.0.11 (private)
 - @dhis2/d2-ui-file-menu: 1.0.1 => 1.0.2
 - @dhis2/d2-ui-forms: 1.0.5 => 1.0.6
 - @dhis2/d2-ui-group-editor: 1.0.9 => 1.0.10
 - @dhis2/d2-ui-header-bar: 1.0.13 => 1.0.14
 - @dhis2/d2-ui-icon-picker: 1.0.9 => 1.0.10
 - @dhis2/d2-ui-legend: 1.0.10 => 1.0.11
 - @dhis2/d2-ui-org-unit-select: 1.0.9 => 1.0.10
 - @dhis2/d2-ui-org-unit-tree: 1.0.9 => 1.0.10
 - @dhis2/d2-ui-sharing-dialog: 1.0.9 => 1.0.10
 - @dhis2/d2-ui-table: 1.0.10 => 1.0.11
 - @dhis2/d2-ui-translation-dialog: 1.0.10 => 1.0.11
 - example-cra: 0.1.0 => 0.1.1 (private)

? Are you sure you want to publish the above changes? Yes
lerna info publish Publishing packages to npm...
lerna info published @dhis2/d2-ui-core
lerna info published @dhis2/d2-ui-forms
lerna info published @dhis2/d2-ui-expression-manager
lerna info published @dhis2/d2-ui-group-editor
lerna info published @dhis2/d2-ui-app
lerna info published @dhis2/d2-ui-icon-picker
lerna info published @dhis2/d2-ui-org-unit-tree
lerna info published @dhis2/d2-ui-org-unit-select
lerna info published @dhis2/d2-ui-sharing-dialog
lerna info published @dhis2/d2-ui-translation-dialog
lerna info published @dhis2/d2-ui-favorites-dialog
lerna info published @dhis2/d2-ui-header-bar
lerna info published @dhis2/d2-ui-table
lerna info published @dhis2/d2-ui-file-menu
lerna info published @dhis2/d2-ui-legend
lerna info git Pushing tags...

Successfully published:
 - @dhis2/d2-ui-app@1.0.5
 - @dhis2/d2-ui-core@1.2.0
 - @dhis2/d2-ui-expression-manager@1.0.7
 - @dhis2/d2-ui-favorites-dialog@1.0.10
 - @dhis2/d2-ui-file-menu@1.0.2
 - @dhis2/d2-ui-forms@1.0.6
 - @dhis2/d2-ui-group-editor@1.0.10
 - @dhis2/d2-ui-header-bar@1.0.14
 - @dhis2/d2-ui-icon-picker@1.0.10
 - @dhis2/d2-ui-legend@1.0.11
 - @dhis2/d2-ui-org-unit-select@1.0.10
 - @dhis2/d2-ui-org-unit-tree@1.0.10
 - @dhis2/d2-ui-sharing-dialog@1.0.10
 - @dhis2/d2-ui-table@1.0.11
 - @dhis2/d2-ui-translation-dialog@1.0.11
lerna success publish finished
```

Note that Lerna did not publish the packages which are marked as
`private` even though they are listed under changes. Lerna still updated
the dependencies of these packages however, which is why they are listed
as changed.

We use this fact to ignore certain packages, either because they
shouldn't be published (`example-cra`) or because they are deprecated
(`@dhis2/d2-ui-favorites-menu`).

# Troubleshooting

## The git tags were pushed, but the packages were not published to npm

First double check that you are logged in to npm
```
npm whoami
```

If you are not logged in, follow either the npm or yarn workflow below:

npm:
```
$ npm login
... (entering credentials)

$ npm whoami
mynpmUserName

$ cd packages/d2-ui-file-menu

$ npm publish
... (publishes)
```

yarn:
```
$ yarn login
... (entering username, email)

$ cd packages/d2-ui-file-menu

$ yarn publish
...(requests password & publishes)

```
