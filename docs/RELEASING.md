# Releasing D2-ui packages

The root-level `package.json` contains the `version` key, which will be
used to publish all packages.

# Publish to NPM

0. Get on the `master` branch

```
git checkout master
git pull
```

1. Update the `version`

```
yarn version
```

2. Push the bump commit and version tag

```
git push --follow-tags
```

3. Start the release workflow manually

https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/

