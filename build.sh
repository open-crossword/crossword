#!/usr/bin/env bash
# Compiles the project with elm make

if [ "$1" == "prod" ]; then
    elm make src/Main.elm --output=elm.js --optimize
else
    elm make src/Main.elm --output=elm.js
fi
