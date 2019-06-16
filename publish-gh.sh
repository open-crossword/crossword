#!/usr/bin/env bash
# Script to publish to github pages.
#Adapted from https://github.com/ocaml/ocamlunix/blob/master/publish-gh

function publish {
    echo "Publishing to Github Pages..."
    set -e
    TMP=${TMP:="/tmp/crossword-gh"}
    rm -rf $TMP
    git clone `git config --get remote.origin.url` $TMP --reference .
    git -C $TMP checkout --orphan gh-pages
    git -C $TMP reset
    git -C $TMP clean -dxf
    ./build.sh "prod"
    cp index.html elm.js $TMP/
    git -C $TMP add .
    git -C $TMP commit -m "Update crossword website"
    git -C $TMP push origin gh-pages -f
    rm -rf $TMP
    echo "Success!"
}

read -r -p "Are you sure you want to publish master to Github Pages? [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
then
    publish
else
    echo "Aborted"
fi