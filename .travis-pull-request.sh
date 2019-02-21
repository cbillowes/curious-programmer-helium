#!/bin/bash

echo "Creating variables"
export TAG=`if [ "$TRAVIS_BRANCH" == "master" ]; then echo "latest"; else echo "build.$TRAVIS_BUILD_NUMBER"; fi`
export REPO="https://$GITHUB_TOKEN@github.com/$GITHUB_REPO"
export TRAP=0

function failing_step() {
    echo "This command should fail the build"
    git clone https://something.somewhere.github.com
    TRAP=$?
}

function passing_step() {
    echo $TRAP
    if [ $TRAP == 0 ]; then
        echo "Passing step"
        TRAP=$?
    fi
}

function get_source_code() {
    if [ $TRAP == 0 ]; then
        echo "Getting the source code"
        git clone https://$GITHUB_TOKEN@github.com/$GITHUB_REPO
        git branch
        git checkout $TRAVIS_BRANCH
        git fetch
        TRAP=$?
    fi
}

function tag_branch() {
    if [ $TRAP == 0 ]; then
        echo "Tagging branch"
        echo "git tag -a $TAG -m \"Tagged by TravisCI for $TRAVIS_COMMIT\""
        git tag -a $TAG -m "Tagged by TravisCI for $TRAVIS_COMMIT"
        TRAP=$?
    else
        echo "Skip tagging branch"
    fi
}

function create_pull_request() {
    if [ $TRAP == 0 ]; then
        if [ "$TRAVIS_BRANCH" == "develop" ]; then
            echo "Creating pull request"
            echo hub pull-request -p -b $TRAVIS_BRANCH -h $TRAVIS_COMMIT -m \"Create PR for $TRAVIS_COMMIT on $TAG"\""
            hub pull-request -p -b $TRAVIS_BRANCH -h $TRAVIS_COMMIT -m "Create PR for $TRAVIS_COMMIT on $TAG"
            TRAP=$?
        fi
    else
        echo "Skip creating pull request"
    fi
}

function push() {
    if [ $TRAP == 0 ]; then
        echo "Pushing to GitHub"
        echo "git push https://$GITHUB_TOKEN@github.com/$GITHUB_REPO origin/$TRAVIS_BRANCH $TAG > /dev/null 2>&1"
        git push https://$GITHUB_TOKEN@github.com/$GITHUB_REPO origin/$TRAVIS_BRANCH $TAG > /dev/null 2>&1
        TRAP=$?
    else
        echo "Skip pushing to GitHub"
    fi
}

get_source_code
tag_branch
create_pull_request
push

if [ $TRAP == 0 ]; then
    echo "Just throw a fucking party!"
else
    echo "Well now, this is a disaster! o_O"
fi

echo "Script will exit with code $TRAP"
(exit $TRAP)
