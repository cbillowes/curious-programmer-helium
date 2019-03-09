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
export DESCRIPTION="Build from revision ${CF_REVISION}"
export VERSION="${CF_PULL_REQUEST_NUMBER}"
export SOURCE_BRANCH="${CF_BRANCH}"
export TARGET_BRANCH="${CF_BASE_BRANCH}"
export DATA='{"title":"Automated release \uD83D\uDC4F '${VERSION}'", "body":"'${DESCRIPTION}'", "base":"'${TARGET_BRANCH}'","head":"'${SOURCE_BRANCH}'"}'

echo "About to create a pull request posting " \
     ${DATA} \
     "to ${URL}"

curl -H \
  "Authorization: token ${TOKEN}" \
  --request POST ${URL} \
  --data "${DATA}"
