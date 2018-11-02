# Releasing D2-ui packages

The root-level `package.json` contains the `version` key which will be
used to publish all packages.

The release process is executed by Travis using [deploy
build](https://github.com/dhis2/deploy-build)

# Deployment

All commits across all branches are built automatically and published to
[d2-ci/d2-ui-<package>](https://github.com/d2-ci?utf8=%E2%9C%93&q=d2-ui-&type=&language=)
on a successful build using the `deploy-build.sh` script.

# Publish to NPM

To publish to NPM, create a version tag locally using `yarn` or `npm`
and push that tag to the git repo.

Rememeber to also push the master branch as the `version` command adds a
commit there as well.

```
yarn version 
  v0.0.0

git push origin master
git push origin v0.0.0
```

After a successful build and publish to d2-ci of all the packages,
Travis invokes the `publish-build.sh` script, which publishes each
package one-by-one to NPM.
