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

# Loop through each project directory to remove existing zip files and create new ones
for project in "${projects[@]}"; do
    zip_file="${project}.zip"
    
    # Check if the zip file exists and remove it
    if [ -f "$zip_file" ]; then
        echo "Removing existing zip file $zip_file"
        rm "$zip_file"
    fi
    
    # Create a new zip file for the project directory
    echo "Creating zip file for $project"
    zip -r "$zip_file" "$project"
done

echo "Zip files have been created for all projects."
