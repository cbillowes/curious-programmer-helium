#!/bin/bash -e
printf "Inititating Travis Automerge...\n"

if ! grep -q "$BRANCHES_TO_MERGE_REGEX" <<< "$TRAVIS_BRANCH"; then
    printf "Current branch %s doesn't match regex %s, exiting\\n" \
        "$TRAVIS_BRANCH" "$BRANCHES_TO_MERGE_REGEX" >&2
    exit 0
fi

export $TAG = "build.$TRAVIS_BUILD_NUMBER"

printf "\nI'm about to clone the repository\n"
# Since Travis does a partial checkout, we need to get the whole thing
repo_temp=$(mktemp -d)

printf "Cloning https://github.com/$GITHUB_REPO\n"
git clone "https://github.com/$GITHUB_REPO" "$repo_temp"

# shellcheck disable=SC2164
cd "$repo_temp"

printf "\nLet's see what branch I'm on\n"
git branch

printf '\nChecking out %s\n' "$BRANCH_TO_MERGE_INTO" >&2
git checkout "$BRANCH_TO_MERGE_INTO"

printf '\nTagging branch %s\n' "$TAG"
git tag "$TAG" -a -m 'Generated tag from TravisCI build' "$TRAVIS_BUILD_NUMBER"

printf '\nMerging %s\n' "$TRAVIS_COMMIT" >&2
git merge --ff-only "$TRAVIS_COMMIT"

printf '\nPushing to %s\n' "$GITHUB_REPO" >&2
push_uri="https://$GITHUB_SECRET_TOKEN@github.com/$GITHUB_REPO"
printf push_uri

# Redirect to /dev/null to avoid secret leakage
git push --tags "$push_uri" "$BRANCH_TO_MERGE_INTO" >/dev/null 2>&1
git push --tags "$push_uri" :"$TRAVIS_BRANCH" >/dev/null 2>&1
