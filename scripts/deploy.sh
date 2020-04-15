#!/usr/bin/env sh

function install_cf {
  cd /tmp
  curl -L "https://packages.cloudfoundry.org/stable?release=linux64-binary&source=github" | tar -zx
  mv ./cf /usr/local/bin
  chmod +x /usr/local/bin/cf
  cd -
}

if [ -n "$USERNAME" && -n "$PASSWORD" ]; then
  install_cf

  CF_USERNAME="$USERNAME"
  CF_PASSWORD="$PASSWORD"
  CF_ORGANIZATION="suchmokuo"
  CF_SPACE="development"

  cf api https://api.run.pivotal.io
  cf login --u $CF_USERNAME --p $CF_PASSWORD --o $CF_ORGANIZATION --s $CF_SPACE
  cf push
else
  echo "Skip deploy to Bluemix because USERNAME or PASSWORD are empty"
  exit 1
fi