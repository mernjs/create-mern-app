#!/bin/bash

# Define the parent directory where all project directories are located
parent_directory="/Users/vijaypratapsingh/Desktop/create-mern-app/src/snippets"

# Use find to get a list of project directories dynamically (1 level deep)
projects=($(find "$parent_directory" -maxdepth 1 -type d -not -name ".*"))

# Loop through each project directory and stop the servers
for project in "${projects[@]}"; do
    echo "Stopping project in $project"
    
    # Check if PID file exists
    if [ -f "pids/$project.pid" ]; then
        # Read the PID from the file and kill the process
        PID=$(cat "pids/$project.pid")
        kill $PID
        echo "$project stopped, PID $PID killed"
        
        # Remove the PID file
        rm "pids/$project.pid"
    else
        echo "PID file not found for $project"
    fi
done

echo "All dev servers have been stopped."
