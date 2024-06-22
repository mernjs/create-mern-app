#!/bin/bash

# Function to check the last command for errors
check_last_command() {
  if [ $? -ne 0 ]; then
    echo "An error occurred. Exiting."
    exit 1
  fi
}

# Step 0: Run the sh-stop-projects.sh script to stop all running ports
echo "Ensuring templates/app/sh-stop-projects.sh is executable..."
chmod +x templates/app/sh-stop-projects.sh
check_last_command

echo "Running templates/app/sh-stop-projects.sh to clean up..."
(cd templates/app && sh sh-stop-projects.sh)
check_last_command