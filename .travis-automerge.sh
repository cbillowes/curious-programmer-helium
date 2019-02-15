#!/bin/bash -e
printf "Inititating Travis Automerge...\n"

if ! grep -q "$BRANCHES_TO_MERGE_REGEX" <<< "$TRAVIS_BRANCH"; then
    printf "Current branch %s doesn't match regex %s, exiting\\n" \
        "$TRAVIS_BRANCH" "$BRANCHES_TO_MERGE_REGEX" >&2
    exit 0
fi

export TAG="build.$TRAVIS_BUILD_NUMBER"

# Since Travis does a partial checkout, we need to get the whole thing
repo_temp=$(mktemp -d)

printf "\nGetting the repo at https://github.com/$GITHUB_REPO\n"
git clone "https://github.com/$GITHUB_REPO" "$repo_temp"

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
git tag -a $TAG -m "Generated tag from TravisCI build $TRAVIS_BUILD_NUMBER"

printf '\nPushing to %s\n' "$GITHUB_REPO" >&2
push_uri="https://$GITHUB_SECRET_TOKEN@github.com/$GITHUB_REPO"
printf push_uri

# Redirect to /dev/null to avoid secret leakage
git push --tags "$push_uri" "$BRANCH_TO_MERGE_INTO" >/dev/null 2>&1
git push --tags "$push_uri" :"$TRAVIS_BRANCH" >/dev/null 2>&1

printf "\nCleanup house > Delete temp directory\n"
rm -rf $repo_temp
