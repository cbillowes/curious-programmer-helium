#!/bin/bash

# Source of wisdom
# https://medium.com/onfido-tech/travis-surge-github-auto-deploy-every-pr-branch-and-tag-a6c8c790831f
if [ "$TRAVIS_BRANCH" == "develop" ] #TAG is not empty
then
    #sorts the tags and picks the latest
    #sort -V does not work on the travis machine
    #sort -V              ref: http://stackoverflow.com/a/14273595/689223
    #sort -t ...          ref: http://stackoverflow.com/a/4495368/689223
    #reverse with sed     ref: http://stackoverflow.com/a/744093/689223
    #git tags | ignore release candidates | sort versions | reverse | pick first line
    LATEST_TAG=`git tag | grep -v rc | sort -t. -k 1,1n -k 2,2n -k 3,3n -k 4,4n | sed '1!G;h;$!d' | sed -n 1p`
    POST_TO=https://api.github.com/repos/cbillowes/curious-programmer-helium/pulls
    curl -H "Authorization: token ${GITHUB_TOKEN}" --request POST ${POST_TO} --data '{"title":"Travis automatic deployment: '${LATEST_TAG}'", "base":"master","head":"'${TRAVIS_BRANCH}'"}'
fi
