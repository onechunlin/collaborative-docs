#!/bin/bash
rm -rf node_modules
NODE_ENV=production
npm install
npm run build
# need global serve
serve -s ./dist -p 8000