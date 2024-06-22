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

# Set your repository information
GITHUB_USER="mernjs"
REPO_NAME="create-mern-app"

# Step 1: Run the sh-zip-projects.sh script to create the zip file
echo "Running templates/app/sh-zip-projects.sh to create the zip file..."
sh templates/app/sh-zip-projects.sh
check_last_command

# Step 2: Add all changes and commit
echo "Adding all changes..."
git add .
check_last_command

echo "Committing changes with message 'Y2024'..."
git commit -am "Y2024"
check_last_command

# Step 3: Push changes to the master branch
echo "Pushing changes to the master branch..."
git push origin master
check_last_command

# Step 4: Navigate to the package directory
echo "Navigating to package directory 'packages/create-mernjs-app'..."
cd packages/create-mernjs-app
check_last_command

# Step 5: Bump the version (patch, minor, or major)
# Update the version here as per your need
echo "Updating the package version..."
NEW_VERSION=$(npm version patch)  # Use npm version minor or npm version major as needed
check_last_command

# Extract the new version tag
NEW_VERSION_TAG=$(echo $NEW_VERSION | tr -d 'v')

# Step 6: Ensure you are logged into npm
echo "Checking npm login status..."
npm whoami &> /dev/null
if [ $? -ne 0 ]; then
  echo "You are not logged in to npm. Please login:"
  npm login
  check_last_command
fi

# Step 7: Publish the package
echo "Publishing the package to npm..."
npm publish --access public
check_last_command

echo "Package published successfully!"

# Step 8: Create and push the version tag to GitHub
echo "Creating a new Git tag for the version $NEW_VERSION_TAG..."
git tag -a "v$NEW_VERSION_TAG" -m "Release version $NEW_VERSION_TAG"
check_last_command

echo "Pushing the tag to GitHub..."
git push origin "v$NEW_VERSION_TAG"
check_last_command

# Step 9: Push the version bump commit and tag to the remote repository
echo "Pushing version bump commit and tag to the remote repository..."
git push origin master --follow-tags
check_last_command

# Step 10: Create a release on GitHub
echo "Creating a release on GitHub..."
RELEASE_DATA=$(cat <<EOF
{
  "tag_name": "v$NEW_VERSION_TAG",
  "name": "v$NEW_VERSION_TAG",
  "body": "Release version $NEW_VERSION_TAG",
  "draft": false,
  "prerelease": false
}
EOF
)

RELEASE_RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$RELEASE_DATA" \
  "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME/releases")

check_last_command

echo "Release created on GitHub!"

echo "All done!"
