#!/bin/bash

# This script keeps version of manifest.common.json in sync with package.json

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

jq() {
  "$script_dir/../node_modules/node-jq/bin/jq" "$@"
}

manifest_filename="manifest.common.json"
manifest_path="$script_dir/../packages/common/src/$manifest_filename"

package_filename="package.json"
package_path="$script_dir/../packages/common/$package_filename"

new_version=$(jq -r '.version' $package_path)
prev_version=$(jq -r '.version' $manifest_path)

jq --arg VERSION $new_version '.version = $VERSION' $manifest_path >"$manifest_path.tmp"
mv "$manifest_path.tmp" $manifest_path

echo -e "\nVersion bump version in \"$manifest_filename\"\n"
echo -e "Previous version: $prev_version"
echo -e "New version: $new_version\n"
