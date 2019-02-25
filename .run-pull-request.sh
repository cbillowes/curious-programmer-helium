#!/usr/bin/env bash

echo "   __                  _                  __   "
echo "  / /   ___ _   _ _ __(_) ___  _   _ ___  \ \  "
echo " | |   / __| | | | '__| |/ _ \| | | / __|  | | "
echo "< <   | (__| |_| | |  | | (_) | |_| \__ \   > >"
echo " | |   \___|\__,_|_|  |_|\___/ \__,_|___/  | | "
echo "  \_\                                     /_/  "
echo ""
echo "-------------------------------------------------------------------------"
echo "🎵 Pulling wires by request is what I simply do best"
echo "-------------------------------------------------------------------------"

export TOKEN="${GITHUB_TOKEN}"
export URL="${GITHUB_API}/pulls"
export VERSION="${CI_PIPELINE_ID}"
export SOURCE_BRANCH="${CI_COMMIT_REF_NAME}"
export TARGET_BRANCH="${TARGET_BRANCH}"

curl -H \
  "Authorization: token ${TOKEN}" \
  --request POST ${URL} \
  --data '{"title":"Automated release \uD83D\uDC4F '${VERSION}'", "base":"'${TARGET_BRANCH}'","head":"'${SOURCE_BRANCH}'"}'
