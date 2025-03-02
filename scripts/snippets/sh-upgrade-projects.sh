#!/bin/bash

# Define the parent directory where all project directories are located
parent_directory="/Users/vijaypratapsingh/Desktop/create-mern-app/templates/snippets"

# Use find to get a list of project directories dynamically (1 level deep)
projects=($(find "$parent_directory" -maxdepth 1 -type d -not -name ".*"))

# Loop through each project directory and run the upgrade command
for project in "${projects[@]}"; do
    echo "Upgrading packages in $project"
    cd "$project"
    
    # Check if package.json exists
    if [ -f package.json ]; then
        # Run the upgrade command
        npm run upgrade
    else
        echo "package.json not found in $project"
    fi
    
    # Go back to the parent directory
    cd ..
done

echo "All projects have been upgraded."
