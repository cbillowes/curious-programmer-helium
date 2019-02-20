#!/bin/bash -e

echo "Creating variables"
export TAG=`if [ "$TRAVIS_BRANCH" == "master" ]; then echo "latest"; else echo "build.$TRAVIS_BUILD_NUMBER"; fi`
export REPO="https://$GITHUB_TOKEN@github.com/$GITHUB_REPO"

did_it_go_smooth() {
    if [ $? -nq 0 ]; then
        echo "Well this is a disaster o_O"
        (exit 1)
    fi
}

get_source_code() {
    echo "Getting the source code"
    git clone https://$GITHUB_TOKEN@github.com/$GITHUB_REPO
    git branch
    git checkout $TRAVIS_BRANCH
    git fetch
    did_it_go_smooth()
}

tag_branch() {
    echo "Tagging branch"
    echo "git tag -a $TAG -m \"Tagged by TravisCI for $TRAVIS_COMMIT\""
    git tag -a $TAG -m "Tagged by TravisCI for $TRAVIS_COMMIT"
    did_it_go_smooth()
}

create_pull_request() {
    if [ "$TRAVIS_BRANCH" == "develop" ]; then
        echo "Creating pull request"
        echo hub pull-request -p -b $TRAVIS_BRANCH -h $TRAVIS_COMMIT -m \"Create PR for $TRAVIS_COMMIT on $TAG"\""
        hub pull-request -p -b $TRAVIS_BRANCH -h $TRAVIS_COMMIT -m "Create PR for $TRAVIS_COMMIT on $TAG"
        did_it_go_smooth()
    fi
}

push() {
    echo "Pushing to GitHub"
    echo "git push https://$GITHUB_TOKEN@github.com/$GITHUB_REPO origin/$TRAVIS_BRANCH $TAG > /dev/null 2>&1"
    git push https://$GITHUB_TOKEN@github.com/$GITHUB_REPO origin/$TRAVIS_BRANCH $TAG > /dev/null 2>&1
    did_it_go_smooth()
}

get_source_code()
tag_branch()
create_pull_request()
push()

echo "Just throw a fucking party!"
(exit 0)
