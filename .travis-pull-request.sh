#!/bin/bash -e

export TAG=`if [ "$TRAVIS_BRANCH" == "master" ]; then echo "latest"; else echo "build.$TRAVIS_BUILD_NUMBER"; fi`
export REPO="https://$GITHUB_SECRET_TOKEN@github.com/$GITHUB_REPO"

echo "Cloning repository"
git clone https://$GITHUB_SECRET_TOKEN@github.com/$GITHUB_REPO $TRAVIS_BRANCH
git fetch

echo "Tagging the build $TAG"
echo "Working on $TRAVIS_BRANCH: Pull request: $TRAVIS_PULL_REQUEST"

echo "Creating git tag"
git tag -a $TAG -m "Tagged by TravisCI for $COMMIT"

echo "Creating pull request for $COMMIT on $TAG"
hub pull-request -m "Create PR for $COMMIT on $TAG"

echo "Pushing to GitHub"
git push -u https://$GITHUB_SECRET_TOKEN@github.com/$GITHUB_REPO origin/$TRAVIS_BRANCH $TAG

if [ $? -eq 0 ]; then
    echo "Just throw a fucking party!"
    (exit 0)
else
    echo "Well this is a disaster o_O"
    (exit 1)
fi
