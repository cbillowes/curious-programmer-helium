#!/bin/bash -e
export APP_DIRECTORY="/public"
export HOST="https://sad-ritchie-f5775c.netlify.com"

echo "----------------------------------------------------------"
echo "Download dependencies"
echo "----------------------------------------------------------"
npm install netlify-cli -g

echo "----------------------------------------------------------"
echo "Build the web app"
echo "----------------------------------------------------------"
npm run build

echo "----------------------------------------------------------"
echo "Deploy to sad-ritchie-f5775c"
echo "----------------------------------------------------------"
netlify deploy --dir=$APP_DIRECTORY

echo "----------------------------------------------------------"
echo "Fire up the web server"
echo "----------------------------------------------------------"
gatsby serve &

echo "----------------------------------------------------------"
echo "Create a lighthouse instance and hope it freaking works"
echo "----------------------------------------------------------"
lighthousebot $HOST -- --perf=100 --pwa=100 --seo=100 --a11y=100 --bp=100
lighthousebot $HOST/archives -- --perf=100 --pwa=100 --seo=100 --a11y=100 --bp=100
lighthousebot $HOST/tags -- --perf=100 --pwa=100 --seo=100 --a11y=100 --bp=100
lighthousebot $HOST/about -- --perf=100 --pwa=100 --seo=100 --a11y=100 --bp=100
