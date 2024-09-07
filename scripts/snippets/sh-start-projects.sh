#!/bin/bash

# Define the parent directory where all project directories are located
parent_directory="/Users/vijaypratapsingh/Desktop/create-mern-app/src/snippets"

# Use find to get a list of project directories dynamically (1 level deep)
projects=($(find "$parent_directory" -maxdepth 1 -type d -not -name ".*"))

# Create logs and pids directories if they don't exist
mkdir -p logs
mkdir -p pids

# Loop through each project directory and run yarn install
for project in "${projects[@]}"; do
    echo "Starting project in $project"
    
    # Navigate to the project directory
    cd "$project"
    
    # Check if package.json exists
    if [ -f package.json ]; then
        # Run yarn dev and log output to a file
        (yarn dev > "../logs/$project.log" 2>&1 & echo $! > "../pids/$project.pid")
        echo "$project started, logging to ../logs/$project.log, PID saved to ../pids/$project.pid"
    else
        echo "package.json not found in $project"
    fi
    
    # Go back to the parent directory
    cd ..
done

# Wait for all background processes to finish
wait

echo "Dev servers have been started for all projects."
