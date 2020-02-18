# Releasing D2-ui packages

The root-level `package.json` contains the `version` key, which will be
used to publish all packages.

The release process is executed by Travis using [deploy
build](https://github.com/dhis2/deploy-build)

# Deployment

All commits across all branches are built automatically and published to
[d2-ci/d2-ui-packageName](https://github.com/d2-ci?utf8=%E2%9C%93&q=d2-ui-&type=&language=)
on a successful build using the `deploy-build.sh` script.

# Publish to NPM

Publishing to NPM is triggered when a git tag is pushed. First you need to bump the npm version manually. You can either bump the version in your feature/fix branch (make sure the latest master is in the branch), or you can create a new branch from master just for the version bump. Note that your branch needs some kind of code change. The commit message must follow semantic-release rules.

On your branch, create a version tag locally using `yarn` or `npm`:

```
yarn version
=> 6.5.7
```

This will make a new commit to the branch, and make a git tag.

Push the commit, create the PR, get it approved, and merge to master. Then push the tag that was created:

```
git push --tags
```

After a successful build and publish to d2-ci of all the packages,
Travis invokes the `publish-build.sh` script, which publishes each
package one-by-one to NPM.
