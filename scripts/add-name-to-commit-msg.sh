#!/usr/bin/env sh

file=$HUSKY_GIT_PARAMS
user=$(git config --local user.name)

if [ -z "$user" ]; then
  echo "You should set your git local user name!"
  exit 1
fi

message=$(cat $file)

echo "[$user] $message" > $file