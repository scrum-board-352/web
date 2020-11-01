#!/usr/bin/env bash

. "$(dirname $0)/utils.sh"

params=(`echo "$HUSKY_GIT_PARAMS"`)
file="${params[0]}"
user=$(git config --local user.name)

if [ -z "$user" ]; then
  echo "You should set your git local user name!"
  exit 1
fi

message=$(cat "$file")
prefix="[$user]"

start_with "$message" "$prefix"
if [ $? -eq 0 ]; then
  echo "$prefix $message" > "$file"
fi
