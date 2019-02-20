#!/bin/bash -e

export TRAVIS_PULL_REQUEST=true
export TAG=if [ "$TRAVIS_BRANCH" == "master" ]; then echo "latest"; else echo "build.$TRAVIS_BUILD_NUMBER"; fi
export REPO="https://$GITHUB_SECRET_TOKEN@github.com/$GITHUB_REPO"

echo "Get hub"
curl https://github.com/github/hub/releases/download/v2.9.0/hub-linux-amd64-2.9.0.tgz -o hub-linux-amd64-2.9.0.tgz
tar xvzf hub-linux-amd64-2.9.0.tgz -C ./

echo "Tagging the build $TAG"
echo "$TRAVIS_BRANCH is a pull request: $TRAVIS_PULL_REQUEST"

echo "Creating git tag"
git tag -a $TAG -m "Tagged by TravisCI for $COMMIT"

echo "Pushing to GitHub"
git push -u $REPO origin/$TRAVIS_BRANCH $TAG

echo "Create pull request"
./hub pr checkout PR.$TAG
git push -u $REPO origin/PR.$TAG

if [ $? -eq 0 ]; then
    echo "Just throw a fucking party!"
    (exit 0)
else
    echo "Well this is a disaster o_O"
    (exit 1)
fi
