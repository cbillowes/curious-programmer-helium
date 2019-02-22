#!/bin/bash

# Source of wisdom
# https://medium.com/onfido-tech/travis-surge-github-auto-deploy-every-pr-branch-and-tag-a6c8c790831f
if [ "$TRAVIS_BRANCH" == "develop" ]
then
    POST_TO=https://api.github.com/repos/cbillowes/curious-programmer-helium/pulls
    curl -H "Authorization: token ${GITHUB_TOKEN}" --request POST ${POST_TO} --data '{"title":"Travis automatic deployment: '${TRAVIS_COMMIT}'", "base":"master","head":"'${TRAVIS_BRANCH}'"}'
elif [ "$TRAVIS_BRANCH" == "master" ]
then
    # tag branch
else
    POST_TO=https://api.github.com/repos/cbillowes/curious-programmer-helium/pulls/${TRAVIS_COMMIT}/merge
    curl -H "Authorization: token ${GITHUB_TOKEN}" --request PUT ${POST_TO} --data '{"commit_title":"Travis automatic merge: '${TRAVIS_COMMIT}'", "sha": "'${TRAVIS_PULL_REQUEST_SHA}'", "merge_method": "rebase"}'
fi
