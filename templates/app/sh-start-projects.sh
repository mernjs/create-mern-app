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
