#!/usr/bin/env bash
# Simple watcher script for running the Elm compiler on file system changes
# Based on https://discourse.elm-lang.org/t/simple-watcher-for-elm-make/3694/2

function run {
  # Reset the terminal scrollback history
  # --> all the errors you see are the current ones, not stale
  clear;
  tput reset;

  date -R;

 ./build.sh
}

export -f run

# ... and when you save files in these directories
watchexec -w ./src run
