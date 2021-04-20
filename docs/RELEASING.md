# Releasing D2-ui packages

The root-level `package.json` contains the `version` key, which will be
used to publish all packages.

Pushing directly to master is not allowed, so the version bump should be added to the PR that will be merged.

# Publish to NPM

1. Update the `version` in the working branch

```
yarn version
```

2. Remove the local tag

```
git tag -d vXXX
```

3. Push the bump commit

```
git push
```

4. Merge the PR on Github

5. Tag the master branch

```
git pull
git tag vXXX
git push --tags
```

6. Start the release workflow manually

Go to [the d2-ui release
action](https://github.com/dhis2/d2-ui/actions?query=workflow%3A%22dhis2%3A+release+d2-ui%22)
and click "Run workflow" from `master`.
