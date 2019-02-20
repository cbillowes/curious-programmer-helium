#!/bin/bash -e

echo "Creating variables"
export TAG=`if [ "$TRAVIS_BRANCH" == "master" ]; then echo "latest"; else echo "build.$TRAVIS_BUILD_NUMBER"; fi`
export REPO="https://$GITHUB_TOKEN@github.com/$GITHUB_REPO"

echo "Getting the source code"
git clone https://$GITHUB_TOKEN@github.com/$GITHUB_REPO
git branch
git checkout $TRAVIS_BRANCH
git fetch

echo "Tagging branch"
echo "git tag -a $TAG -m \"Tagged by TravisCI for $TRAVIS_COMMIT\""
git tag -a $TAG -m "Tagged by TravisCI for $TRAVIS_COMMIT"

if [ "$TRAVIS_BRANCH" == "develop" ]; then
    echo "Creating pull request"
    echo hub pull-request -h $TRAVIS_BRANCH -m \"Create PR for $TRAVIS_COMMIT on $TAG"\""
    hub pull-request -h $TRAVIS_BRANCH -m "Create PR for $TRAVIS_COMMIT on $TAG"
fi

echo "Pushing to GitHub"
echo "git push https://$GITHUB_TOKEN@github.com/$GITHUB_REPO origin/$TRAVIS_BRANCH $TAG > /dev/null 2>&1"
git push https://$GITHUB_TOKEN@github.com/$GITHUB_REPO origin/$TRAVIS_BRANCH $TAG > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "Just throw a fucking party!"
    (exit 0)
else
    echo "Well this is a disaster o_O"
    (exit 1)
fi
