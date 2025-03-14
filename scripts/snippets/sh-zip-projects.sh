#!/bin/bash

# Define the parent directory where all project directories are located
parent_directory="/Users/vijaypratapsingh/Desktop/create-mern-app/templates/snippets"

# Define the directory where the zip files will be stored
zip_directory="/Users/vijaypratapsingh/Desktop/create-mern-app/zip/snippets"

# Create the zip directory if it doesn't exist
mkdir -p "$zip_directory"

# Use find to get a list of project directories dynamically (1 level deep)
projects=($(find "$parent_directory" -maxdepth 1 -type d -not -name ".*"))

# Loop through each project directory to remove existing zip files and create new ones
for project in "${projects[@]}"; do
    # Get the project name from the full path
    project_name=$(basename "$project")
    
    # Define the zip file name in the new directory
    zip_file="$zip_directory/${project_name}.zip"
    
    # Check if the zip file exists and remove it
    if [ -f "$zip_file" ]; then
        echo "Removing existing zip file $zip_file"
        rm "$zip_file"
    fi
    
    # Create a new zip file while keeping folder structure and excluding .DS_Store
    echo "Creating zip file for $project"
    (cd "$parent_directory" && zip -r "$zip_file" "$project_name" -x "*.DS_Store")
done

echo "Zip files have been created in $zip_directory for all projects."
