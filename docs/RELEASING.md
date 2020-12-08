# Releasing D2-ui packages

The root-level `package.json` contains the `version` key, which will be
used to publish all packages.

# Publish to NPM

1. Get on the `master` branch

```
git checkout master
git pull
```

2. Update the `version`

```
yarn version
```

3. Push the bump commit and version tag

```
git push --follow-tags
```

4. Start the release workflow manually

Go to [the d2-ui release
action](https://github.com/dhis2/d2-ui/actions?query=workflow%3A%22dhis2%3A+release+d2-ui%22)
and click "Run workflow" from `master`.
