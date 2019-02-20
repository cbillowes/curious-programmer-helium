#!/bin/bash -e

export TAG=`if [ "$TRAVIS_BRANCH" == "master" ]; then echo "latest"; else echo "build.$TRAVIS_BUILD_NUMBER"; fi`
export REPO="https://$GITHUB_SECRET_TOKEN@github.com/$GITHUB_REPO"

echo "Cloning repository"
git clone https://$GITHUB_SECRET_TOKEN@github.com/$GITHUB_REPO $TRAVIS_BRANCH
git fetch

echo "Tagging the build $TAG"
echo "Working on $TRAVIS_BRANCH"

echo "Creating git tag"
git tag -a $TAG -m "Tagged by TravisCI for $COMMIT"

if [ "$TRAVIS_BRANCH" == "develop" ]; then
    echo "Creating pull request for $TRAVIS_COMMIT on $TAG on develop branch"
    hub pull-request -h $TRAVIS_BRANCH -m "Create PR for $TRAVIS_COMMIT on $TAG"
fi

echo "Pushing to GitHub"
git push -u https://$GITHUB_SECRET_TOKEN@github.com/$GITHUB_REPO origin $TRAVIS_BRANCH $TAG

if [ $? -eq 0 ]; then
    echo "Just throw a fucking party!"
    (exit 0)
else
    echo "Well this is a disaster o_O"
    (exit 1)
fi
