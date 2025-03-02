#!/bin/bash

# Define the parent directory where all project directories are located
parent_directory="/Users/vijaypratapsingh/Desktop/create-mern-app/templates/app"

# Use find to get a list of project directories dynamically (1 level deep)
projects=($(find "$parent_directory" -maxdepth 1 -type d -not -name ".*"))

# Loop through each project directory and remove specified files/folders
for project in "${projects[@]}"; do
    echo "Cleaning up $project"

     # Define the zip file name
    zip_file="${project}.zip"
    
    # Check if the zip file exists and remove it
    if [ -f "$zip_file" ]; then
        echo "Removing existing zip file $zip_file"
        rm "$zip_file"
    else
        echo "No zip file found for $project"
    fi


    cd "$project"
    
   
    # Remove node_modules directory if it exists
    if [ -d node_modules ]; then
        echo "Removing node_modules from $project"
        rm -rf node_modules
    fi
    
    # Remove .next directory if it exists
    if [ -d .next ]; then
        echo "Removing .next from $project"
        rm -rf .next
    fi

    # Remove .next directory if it exists
    if [ -d .cache ]; then
        echo "Removing .cache from $project"
        rm -rf .cache
    fi
    
    # Remove .expo-shared directory if it exists
    if [ -d .expo-shared ]; then
        echo "Removing .expo-shared from $project"
        rm -rf .expo-shared
    fi

    # Remove .expo directory if it exists
    if [ -d .expo ]; then
        echo "Removing .expo from $project"
        rm -rf .expo
    fi
    
    # Remove yarn.lock file if it exists
    if [ -f yarn.lock ]; then
        echo "Removing yarn.lock from $project"
        rm yarn.lock
    fi
    
    # Go back to the parent directory
    cd ..
done

# Remove logs and pids directories if they exist
if [ -d logs ]; then
    echo "Removing logs directory"
    rm -rf logs
fi

if [ -d pids ]; then
    echo "Removing pids directory"
    rm -rf pids
fi

echo "Cleanup completed for all projects."
