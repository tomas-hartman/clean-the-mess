# Changelog

## v2.1.0

Internally this release brings a massive overhaul of the extension's overall architecture, the ways it is built, released and developed. Everything was tested and should work well, but if you notice any bugs, please report them.

- **Feature:** The extension was optimized for faster startup and better performance
- **Feature:** Pinned tabs are now taken into account more explicitly, which should provide better user experience and control over them
- **Feature:** Favicons are now displayed in lists of tabs. This allows for better orientation and faster recognition of tab groups. This feature can be turned off in the extension's options
- **Feature:** Badge with number of open tabs is now displayed on the extension's icon. This feature can be turned off in the extension's options
- **Feature:** Duplicate tabs can now be easily deduplicated, keeping open only the older or pinned tab that has the same url
- **Feature (firefox):** Longest inactive list was improved. It now displays time passed since the tab was last active. If you hover over the time, you can see the exact date and time of the last activity
- **Fix:** lot of bugs were fixed
