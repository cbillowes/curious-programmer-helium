#!/bin/bash -e
export HOST="https://sad-ritchie-f5775c.netlify.com"

echo "----------------------------------------------------------"
echo "Create a lighthouse instance and hope it freaking works"
echo "----------------------------------------------------------"
lighthousebot $HOST -- --perf=100 --pwa=100 --seo=100 --a11y=100 --bp=100
lighthousebot $HOST/archives -- --perf=100 --pwa=100 --seo=100 --a11y=100 --bp=100
lighthousebot $HOST/tags -- --perf=100 --pwa=100 --seo=100 --a11y=100 --bp=100
lighthousebot $HOST/about -- --perf=100 --pwa=100 --seo=100 --a11y=100 --bp=100
