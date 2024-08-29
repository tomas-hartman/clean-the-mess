#!/bin/bash

# Function to get absolute path
get_abs_path() {
  echo "$(
    cd "$(dirname "$1")" || exit
    pwd -P
  )/$(basename "$1")"
}

# Define paths
PROJECT_PATH=$(get_abs_path "./clean-the-mess-safari/Clean the mess.xcodeproj")
PROJECT_RESOURCES_DIR='Shared (Clean the mess)/Resources'
RESOURCE_DIR=$(get_abs_path "./clean-the-mess-safari/$PROJECT_RESOURCES_DIR")
COMPILED_RESOURCES_DIR=$(get_abs_path "./dist")

# Remove old resources
echo "Removing old resources..."
rm -rf "$RESOURCE_DIR"/*

# Add new resources to Xcode project
echo "Adding new resources to Xcode project..."
cd "$PROJECT_PATH"
xcodeproj="$PROJECT_PATH/project.pbxproj"

# Use xcodeproj gem to add files
ruby -e "
require 'xcodeproj'

project_path = '$PROJECT_PATH'
compiled_resources_dir = '$COMPILED_RESOURCES_DIR'
project_resources_dir = '$PROJECT_RESOURCES_DIR'

project = Xcodeproj::Project.open(project_path)

# Find the Resources group
group = project.main_group.find_subpath(File.join(project_resources_dir), true)

# Remove old resources
group.files.each do |file|
  if file.path.start_with?('../../../dist/')
    file.remove_from_project
  end
end

Dir.glob(File.join(compiled_resources_dir, '*')).each do |file|
  group.new_file(file)
end

project.save
"

# Check if Ruby script was successful
if [ $? -ne 0 ]; then
  echo "Failed to add resources to Xcode project. Exiting."
  exit 1
fi

echo "Resources updated successfully."
