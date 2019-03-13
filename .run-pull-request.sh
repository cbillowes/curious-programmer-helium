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
export GITHUB_TOKEN="a3c051bb93643cac879f042d7c408f01c693e084"
export GITHUB_API="https://api.github.com/repos/cbillowes/curious-programmer-helium"
export CF_REVISION="069027dc6d6a29f3b6f94b747769551f74b24062"
export CF_PULL_REQUEST_NUMBER="20891cfcbd364decdf5b1e2ca0c065c6a4f01b11"
export CF_BRANCH="integrate"

export TOKEN="${GITHUB_TOKEN}"
export URL="${GITHUB_API}/pulls"
export DESCRIPTION="Build from revision ${CF_REVISION}"
export VERSION="${CF_PULL_REQUEST_NUMBER}"
export SOURCE_BRANCH="${CF_BRANCH}"
export TARGET_BRANCH="master"
export DATA='{"title":"Automated release \uD83D\uDC4F '${VERSION}'", "body":"'${DESCRIPTION}'", "state":"open", "base":"'${TARGET_BRANCH}'","head":"'${SOURCE_BRANCH}'","maintainer_can_modify":true}'

# echo "About to create a pull request posting " \
#      ${DATA} \
#      "to ${URL}"

HTTP_RESPONSE=$(curl -X GET "${URL}"  -H "Authorization: 'token ${TOKEN}'" --data '{"state":"open", "base":"'${SOURCE_BRANCH}'", "sort":"created", "direction":"desc"}')
echo $HTTP_RESPONSE

# HTTP_RESPONSE=$(curl --silent --write-out "HTTPSTATUS:%{http_code}" -X POST $URL -H "Authorization: token ${TOKEN}" --data "${DATA}")
# HTTP_BODY=$(echo "$HTTP_RESPONSE" | sed -e 's/HTTPSTATUS\:.*//g')
# HTTP_STATUS=$(echo "$HTTP_RESPONSE" | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
# echo "$HTTP_BODY"

# if [ ! $HTTP_STATUS -eq 200  ]; then
#   HTTP_RESPONSE=$(curl --silent --write-out "HTTPSTATUS:%{http_code}" -X PATCH $URL/${VERSION} -H "Authorization: token ${TOKEN}" --data "${DATA}")
#   HTTP_BODY=$(echo "$HTTP_RESPONSE" | sed -e 's/HTTPSTATUS\:.*//g')
#   HTTP_STATUS=$(echo "$HTTP_RESPONSE" | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
#   echo ${URL}/${VERSION}
#   echo "$HTTP_BODY"

#   if [ ! $HTTP_STATUS -eq 200  ]; then
#     echo "Shit: ${HTTP_STATUS}"
#     exit 1
#   fi
# fi
