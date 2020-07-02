#!/usr/bin/env sh

# build front-end bundle and move output files into server
npm run build
mv ./build ./server

# install dependencies for server
cd server
npm install