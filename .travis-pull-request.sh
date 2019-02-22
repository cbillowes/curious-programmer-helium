#!/bin/bash

# Source of wisdom
# https://medium.com/onfido-tech/travis-surge-github-auto-deploy-every-pr-branch-and-tag-a6c8c790831f
if [ "$TRAVIS_BRANCH" == "develop" ]
then
    echo "Create a pull request for the develop branch: ${TRAVIS_COMMIT}"
    POST_TO=https://api.github.com/repos/cbillowes/curious-programmer-helium/pulls
    curl -H "Authorization: token ${GITHUB_TOKEN}" --request POST ${POST_TO} --data '{"title":"Travis automatic deployment: '${TRAVIS_COMMIT}'", "base":"master","head":"develop"}'
fi

if [ "$TRAVIS_BRANCH" == "master" ]
then
    # tag branch
fi

if [ "$TRAVIS_PULL_REQUEST" == true ]
then
    echo "Going to rebase ${TRAVIS_BRANCH} onto master and pray it works because eish"
    echo "${TRAVIS_COMMIT}:${TRAVIS_PULL_REQUEST_SHA}"
    PUT_TO=https://api.github.com/repos/cbillowes/curious-programmer-helium/pulls/${TRAVIS_COMMIT}/merge
    curl -H "Authorization: token ${GITHUB_TOKEN}" --request PUT ${PUT_TO} --data '{"commit_title":"Travis automatic merge: '${TRAVIS_COMMIT}'", "sha": "'${TRAVIS_PULL_REQUEST_SHA}'", "merge_method": "rebase"}'
fi
