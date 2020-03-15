#!/usr/bin/env sh

. "$(dirname $0)/utils.sh"

file=$HUSKY_GIT_PARAMS
user=$(git config --local user.name)

if [ -z "$user" ]; then
  echo "You should set your git local user name!"
  exit 1
fi

message=$(cat $file)
prefix="[$user]"

start_with "$message" "$prefix"
if [ $? -eq 0 ]; then
  echo "$prefix $message" > $file
fi
