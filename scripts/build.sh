#!/usr/bin/env sh

# build front-end bundle
npm run build

# install dependencies for server
cd server
npm install