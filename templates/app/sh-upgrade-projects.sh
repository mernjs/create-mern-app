#!/bin/bash

# List of project directories
projects=(
    "electronjs-boilerplate"
    "expo-boilerplate"
    "fastifyjs-mongodb-boilerplate"
    "fastifyjs-mysql-boilerplate"
    "gatsbyjs-boilerplate"
    "nextjs-boilerplate"
    "nodejs-mongodb-boilerplate"
    "nodejs-mysql-boilerplate"
    "react-native-boilerplate"
    "reactjs-boilerplate"
    "reactjs-chrome-extension-boilerplate"
    "reactjs-webpack-boilerplate"
    "t3js-boilerplate"
)

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
