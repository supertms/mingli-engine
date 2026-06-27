#!/usr/bin/env bash
set -euo pipefail

npm install
npm run build
npm test
npm run ziwei -- --solar 2000-08-16 --time-index 2 --gender 女
