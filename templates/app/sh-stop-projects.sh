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
