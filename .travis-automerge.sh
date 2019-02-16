#!/bin/bash -e
printf "Inititating TravisCI Automerge...\n"

if ! grep -q "$BRANCHES_TO_MERGE_REGEX" <<< "$TRAVIS_BRANCH"; then
    printf "Current branch %s doesn't match regex %s, exiting\\n" \
        "$TRAVIS_BRANCH" "$BRANCHES_TO_MERGE_REGEX" >&2
    exit 0
fi

export TAG="build.$TRAVIS_BUILD_NUMBER"

# Since Travis does a partial checkout, we need to get the whole thing
repo_temp=$(mktemp -d)
repo_temp=/tmp/tmp.4QtDc2bR3J

printf "\nGetting the repo at https://github.com/$GITHUB_REPO\n"
#git clone "https://github.com/$GITHUB_REPO" "$repo_temp"

printf "\n"
# shellcheck disable=SC2164
cd "$repo_temp"
git checkout "$TRAVIS_BRANCH"
git fetch --all
git branch

printf "\nMerge %s into %s\n" "$TRAVIS_BRANCH" "$BRANCH_TO_MERGE_INTO"
git checkout "$BRANCH_TO_MERGE_INTO"
git merge $TRAVIS_BRANCH

printf '\nTagging branch with "%s"\n' "$TAG"
#git tag -a $TAG -m "Generated tag from TravisCI build $TRAVIS_BUILD_NUMBER"

push_uri="https://$GITHUB_SECRET_TOKEN@github.com/$GITHUB_REPO"
printf '\nPushing to %s\n' "$push_uri" >&2
# Redirect to /dev/null to avoid secret leakage
if git push $push_uri $BRANCH_TO_MERGE_WITH $TAG; then
    printf "\nJust throw a fucking party!"
    (exit 0)
else
    printf "\nWell this is a disaster o_O"
    (exit 1)
fi

printf "\nCleanup house\n- Delete temp directory\n"
#rm -rf $repo_temp