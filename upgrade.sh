#!/bin/bash

# Function to check the last command for errors
check_last_command() {
  if [ $? -ne 0 ]; then
    echo "An error occurred. Exiting."
    exit 1
  fi
}

# Step 0: Run the sh-cleanup-projects.sh script to clean up before creating the zip file
echo "Ensuring templates/app/sh-cleanup-projects.sh is executable..."
chmod +x templates/app/sh-cleanup-projects.sh
check_last_command

echo "Running templates/app/sh-cleanup-projects.sh to clean up..."
(cd templates/app && sh sh-cleanup-projects.sh)
check_last_command

# Step 1: Run the sh-upgrade-projects.sh script to upgrade dependencies
echo "Ensuring templates/app/sh-upgrade-projects.sh is executable..."
chmod +x templates/app/sh-upgrade-projects.sh
check_last_command

echo "Running templates/app/sh-upgrade-projects.sh to upgrade dependencies..."
(cd templates/app && sh sh-upgrade-projects.sh)
check_last_command

# Step 2: Run the sh-install-projects.sh script to install dependencies
echo "Ensuring templates/app/sh-install-projects.sh is executable..."
chmod +x templates/app/sh-install-projects.sh
check_last_command

echo "Running templates/app/sh-install-projects.sh to install dependencies..."
(cd templates/app && sh sh-install-projects.sh)
check_last_command

# Step 3: Run the sh-start-projects.sh script to start the project
echo "Ensuring templates/app/sh-start-projects.sh is executable..."
chmod +x templates/app/sh-start-projects.sh
check_last_command

echo "Running templates/app/sh-start-projects.sh to start the project..."
(cd templates/app && sh sh-start-projects.sh)
check_last_command

echo "All done!"
