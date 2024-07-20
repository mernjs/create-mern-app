#!/bin/bash

# List of project directories
projects=(
    "expressjs-library-boilerplate"
    "javascript-library-boilerplate"
    "nextjs-library-boilerplate"
    "nodejs-library-boilerplate"
    "react-native-library-boilerplate"
    "reactjs-library-boilerplate"
)

# Loop through each project directory and run yarn install
for project in "${projects[@]}"; do
    echo "Installing dependencies in $project"
    cd "$project"
    
    # Check if package.json exists
    if [ -f package.json ]; then
        # Run yarn install
        yarn install
    else
        echo "package.json not found in $project"
    fi
    
    # Go back to the parent directory
    cd ..
done

echo "Dependencies have been installed for all projects."
