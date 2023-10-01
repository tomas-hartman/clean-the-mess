#!/bin/bash

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
origin="${script_dir}/.."

# Destination directory
destination="${origin}/packages/firefox/build/src_clean_the_mess"

# Define globs for files to copy
globs=(
  "package.json"
  "package-lock.json"
  "README.md"
  "tsconfig.json"
  ".parcelrc"
  ".gitignore"
  "scripts"
  "packages/common/src"
  "packages/common/types"
  "packages/common/package.json"
  "packages/common/babel.config.js"
  "packages/firefox/package.json"
  "packages/firefox/manifest.firefox.json"
  "packages/firefox/.gitignore"
)

# Check if the destination directory exists
if [ ! -d "$destination" ]; then
  mkdir -p "$destination"
fi

# Loop through each glob and copy files/directories matching the glob to the destination
for glob in "${globs[@]}"; do
  # Extract the directory part of the glob
  dirname=$(dirname "$glob")

  # Create the destination directory structure
  mkdir -p "$destination/$dirname"

  # Copy files/directories to the appropriate destination directory
  cp -a "$origin/$glob" "$destination/$dirname/"
done

echo "Files matching the globs copied to $destination."
