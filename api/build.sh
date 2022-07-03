#!/bin/bash
rm -rf node_modules
NODE_ENV=production
npm install
npm run tsc
npm run start