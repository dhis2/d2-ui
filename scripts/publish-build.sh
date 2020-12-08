#!/usr/bin/env bash

# start: shellharden
if test "$BASH" = "" || "$BASH" -uc "a=();true \"\${a[@]}\"" 2>/dev/null; then
    # Bash 4.4, Zsh
    set -euo pipefail
else
    # Bash 4.3 and older chokes on empty arrays with set -u.
    set -eo pipefail
fi
set -x # print all commands
shopt -s nullglob globstar
# end: shellharden

function printerr () {
    >&2 echo -e "\e[91m${1}\e[0m"
}

DRYRUN=0
if [ $# -gt 0 ] && [ "$1" == "--dry-run" ]; then
    DRYRUN=1
    printerr "PERFORMING DRY RUN"
fi

function exec () {
    local CMD="$1"

    if [ $DRYRUN -eq 1 ]; then
        echo $CMD
    else
        $CMD
    fi
}

function publishPackage () {
    local pkg_dir=$1
    local pkg_ver=$2

    pushd "$pkg_dir"

    if [[ -e package.json ]]; then
        jq --exit-status "(
            if has(\"main\") then .main |= sub(\"build\/\"; \"\") else . end|
            if has(\"module\") then .module |= sub(\"build\/\"; \"\") else . end|
            if has(\"browser\") then .browser |= sub(\"build\/\"; \"\") else . end|
            if has(\"dependencies\") then .dependencies |=
                (.|with_entries(if .value == \"0.0.0-PLACEHOLDER\" then .value |= \"$pkg_ver\" else . end)) else . end|
            if has(\"peerDependencies\") then .peerDependencies |=
                (.|with_entries(if .value == \"0.0.0-PLACEHOLDER\" then .value |= \"$pkg_ver\" else . end)) else . end|
            .private = false|
            .version = \"$pkg_ver\"
        )" package.json > build/package.json

        pushd build

        name=$(node -pe "require('./package.json').name")
        version=$(node -pe "require('./package.json').version")

        echo "Publishing package: ${name} @ ${version}"
        exec "npm publish --tag latest --access public"

        popd
    else
        printerr "Package.json file in '${pkg_dir}' does not exist, skipping publish."
    fi

    popd
}

function getVersion {
    local dir=$1
    local JSON="${dir}/package.json"
    jq --exit-status '(.version)' $JSON
}

function getPackageName {
    local dir=$1
    local JSON="${dir}/package.json"
    jq --exit-status '(.name)' $JSON
}

root_ver=$(getVersion ".")
root_ver=${root_ver//\"/}

for dir in ./packages/*/
do
    publishPackage "${dir%/}" "$root_ver"
done

exit 0

