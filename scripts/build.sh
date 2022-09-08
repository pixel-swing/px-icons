#! /usr/bin/bash

# finding all file under `packages/components`
# piping to rollup to config.
echo "build components"
rm -rf dist
find packages -type f -name '*.vue' 
find packages/icons/fa/vue -type f -name '*.vue' -print0 | \
xargs -P4 -0 -I {} node ./build/rollup.config.js {}

# yarn build:entry
# # after components build finished, build icon.ts as well.
# echo "generate type files"
# yarn gen-dts
