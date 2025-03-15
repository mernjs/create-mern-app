#!/bin/bash

# Function to check the last command for errors
check_last_command() {
  if [ $? -ne 0 ]; then
    echo "An error occurred. Exiting."
    exit 1
  fi
}

# Ensure GITHUB_TOKEN is set
if [ -z "$GITHUB_TOKEN" ]; then
  echo "GITHUB_TOKEN is not set. Please set it and try again."
  exit 1
fi

# Ensure jq is installed
if ! command -v jq &> /dev/null; then
  echo "jq could not be found. Please install jq and try again."
  exit 1
fi

# Set your repository information
GITHUB_USER="mernjs"
REPO_NAME="create-mern-app"

npm run clean
echo "Cleanup completed for all projects."

npm run zip
echo "Zip files created for all projects."

# Step 5: Navigate to the package directory
echo "Navigating to package directory 'packages/create-mernjs-app'..."
cd templates/packages/create-mernjs-app
check_last_command

# Confirm package.json exists
PACKAGE_JSON_PATH="package.json"
if [ ! -f "$PACKAGE_JSON_PATH" ]; then
  echo "package.json not found in the directory $(pwd). Exiting."
  exit 1
fi

# Step 6: Bump the version (patch, minor, or major)
echo "Updating the package version..."
NEW_VERSION=$(npm version patch)  # Use npm version minor or npm version major as needed
check_last_command

# Extract the new version tag
NEW_VERSION_TAG=$(echo $NEW_VERSION | tr -d 'v')

# Step 7: Add all changes and commit
echo "Adding all changes..."
git add .
check_last_command

echo "Committing changes with message 'Y2025'..."
git commit -am "Y2025"
check_last_command

# Step 8: Push changes to the master branch
echo "Pushing changes to the master branch..."
git push origin master
check_last_command

# Step 9: Get the latest commit ID
echo "Getting the latest commit ID..."
LATEST_COMMIT_ID=$(git rev-parse HEAD)
check_last_command
echo "Latest commit ID is $LATEST_COMMIT_ID"

# Step 10: Update the commit ID in package.json
echo "Updating commit ID in $PACKAGE_JSON_PATH..."
jq --arg commit_id "$LATEST_COMMIT_ID" '.dependencies.mernjs |= "github:mernjs/create-mern-app#" + $commit_id' $PACKAGE_JSON_PATH > tmp.$$.json && mv tmp.$$.json $PACKAGE_JSON_PATH
check_last_command

# Debug: Check if the jq command worked
echo "Checking if the commit ID was updated correctly in package.json..."
grep "github:mernjs/create-mern-app#$LATEST_COMMIT_ID" $PACKAGE_JSON_PATH
check_last_command

# Step 11: Add all changes and commit
echo "Adding all changes..."
git add .
check_last_command

echo "Committing changes with message 'Y2025'..."
git commit -am "Y2025"
check_last_command

# Step 12: Push changes to the master branch
echo "Pushing changes to the master branch..."
git push origin master
check_last_command

# Step 13: Ensure you are logged into npm
echo "Checking npm login status..."
npm whoami &> /dev/null
if [ $? -ne 0 ]; then
  echo "You are not logged in to npm. Please login:"
  npm login
  check_last_command
fi

# Step 14: Publish the package
echo "Publishing the package to npm..."
npm publish --access public
check_last_command

echo "Package published successfully!"

# Step 15: Create and push the version tag to GitHub
echo "Creating a new Git tag for the version $NEW_VERSION_TAG..."
git tag -a "v$NEW_VERSION_TAG" -m "Release version $NEW_VERSION_TAG"
check_last_command

echo "Pushing the tag to GitHub..."
git push origin "v$NEW_VERSION_TAG"
check_last_command

# Step 16: Push the version bump commit and tag to the remote repository
echo "Pushing version bump commit and tag to the remote repository..."
git push origin master --follow-tags
check_last_command

# Step 17: Create a release on GitHub
echo "Creating a release on GitHub..."

# Create the release notes in markdown format
RELEASE_NOTES=$(cat <<EOT
# **[$NEW_VERSION_TAG] - $(date +%Y-%m-%d)**

## **🚀 New Features**
✅ **Feature 1:** Description here.

## **🔄 Enhancements**
✅ **Enhancement 1:** Description here.

## **🐞 Bug Fixes**
✅ **Bug Fix 1:** Description here.

## **⚡ Performance Optimizations**
✅ **Optimization 1:** Description here.

## **📖 Documentation Updates**
✅ **Docs Update 1:** Description here.

## **👨‍💻 Developer Experience**
✅ **Dev Experience 1:** Description here.

## **🧪 Testing & Stability**
✅ **Testing Update 1:** Description here.

## **⚠️ Deprecations & Breaking Changes**
❌ **Deprecated Feature:** Description here.

## **🚨 Known Issues**
⚠️ **Issue 1:** Description here.
EOT
)

# Use jq to create proper JSON with the release notes
# This properly escapes newlines and special characters
RELEASE_DATA=$(jq -n \
  --arg tag "v$NEW_VERSION_TAG" \
  --arg name "v$NEW_VERSION_TAG" \
  --arg body "$RELEASE_NOTES" \
  '{tag_name: $tag, name: $name, body: $body}')

# Create the GitHub release
RELEASE_RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$RELEASE_DATA" \
  "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME/releases")

check_last_command

# Check if the release was created successfully
if echo "$RELEASE_RESPONSE" | jq -e '.id' > /dev/null; then
  echo "Release created successfully on GitHub!"
  echo "Release URL: $(echo "$RELEASE_RESPONSE" | jq -r '.html_url')"
else
  echo "Failed to create release. Response:"
  echo "$RELEASE_RESPONSE" | jq '.'
  exit 1
fi

echo "All done!"