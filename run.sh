#!/usr/bin/env bash
# Simple script to run the project locally
# We launch a simple webserver with elm reactor and then call our watch script

elm reactor &
 ./watch.sh