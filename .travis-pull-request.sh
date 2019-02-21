#!/bin/bash
set -ev

# TODO: Get rid of $?
# https://docs.travis-ci.com/user/job-lifecycle/#note-on-

echo "Creating variables"
export TAG=`if [ "$TRAVIS_BRANCH" == "master" ]; then echo "latest"; else echo "build.$TRAVIS_BUILD_NUMBER"; fi`
export REPO="https://$GITHUB_TOKEN@github.com/$GITHUB_REPO"
export TRAP=0

function get_source_code() {
    if [ $TRAP == 0 ]; then
        echo "---------------------------------------------------------"
        echo "Getting the source code"
        echo "---------------------------------------------------------"

        git clone https://$GITHUB_TOKEN@github.com/$GITHUB_REPO
        git branch
        git checkout $TRAVIS_BRANCH
        git fetch
        TRAP=$?
    fi
}

function tag_branch() {
    if [ $TRAP == 0 ]; then
        echo "---------------------------------------------------------"
        echo "Tagging branch"
        echo "---------------------------------------------------------"

        echo "git tag -a $TAG -m \"Tagged by TravisCI for $TRAVIS_COMMIT\""
        git tag -a $TAG -m "Tagged by TravisCI for $TRAVIS_COMMIT"
        TRAP=$?
    fi
}

function push_tags() {
    if [ $TRAP == 0 ]; then
        echo "---------------------------------------------------------"
        echo "Pushing tags to GitHub"
        echo "---------------------------------------------------------"

        echo "git push https://$GITHUB_TOKEN@github.com/$GITHUB_REPO origin/$TRAVIS_BRANCH $TAG"
        git push https://$GITHUB_TOKEN@github.com/$GITHUB_REPO origin/$TRAVIS_BRANCH $TAG
        TRAP=$?
    fi
}

function create_pull_request() {
    if [ $TRAP == 0 ]; then
        if [ "$TRAVIS_BRANCH" == "develop" ]; then
            echo "---------------------------------------------------------"
            echo "Creating pull request"
            echo "---------------------------------------------------------"
            #echo hub pull-request -p -b $TRAVIS_BRANCH -h $TRAVIS_COMMIT -m \"Create PR for $TRAVIS_COMMIT on $TAG"\""
            #hub pull-request -p -b $TRAVIS_BRANCH -h $TRAVIS_COMMIT -m "Create PR for $TRAVIS_COMMIT on $TAG"

            echo "git request-pull $TAG https://$GITHUB_TOKEN@github.com/$GITHUB_REPO develop"
            git request-pull $TAG https://$GITHUB_TOKEN@github.com/$GITHUB_REPO develop
            TRAP=$?
        fi
    fi
}

if [ $TRAVIS_BRANCH == "develop" ]; then
    get_source_code
    tag_branch
    push_tags
    create_pull_request
fi

(exit $TRAP)
