#!/usr/bin/env bash

echo "   __                  _                  __   "
echo "  / /   ___ _   _ _ __(_) ___  _   _ ___  \ \  "
echo " | |   / __| | | | '__| |/ _ \| | | / __|  | | "
echo "< <   | (__| |_| | |  | | (_) | |_| \__ \   > >"
echo " | |   \___|\__,_|_|  |_|\___/ \__,_|___/  | | "
echo "  \_\                                     /_/  "
echo ""
echo "-------------------------------------------------------------------------"
echo "🎵 Squashing code into one is what must be, must be done"
echo "-------------------------------------------------------------------------"

export VERSION="${CI_PIPELINE_ID}"
export TOKEN="${GITHUB_TOKEN}"
export URL="${GITHUB_API}/merge/{$VERSION}/merge"
export SHA="${CI_COMMIT_SHA}"

curl -H \
  "Authorization: token ${TOKEN}" \
  --request PUT ${URL} \
  --data '{"title":"Automated release \uD83D\uDC4F '${VERSION}'", "sha":"'${SHA}'","merge_method":"squash"}'


