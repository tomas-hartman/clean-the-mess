# Clean the mess

Hundreds of opened tabs? Dozens of useless duplicate tabs with opened emails, google searches, your favourite social networks and articles you wanted to read a month ago? Let's clean the mess!

Clean the mess! a simple addon that is designed to help you with maintaining order among opened websites. Unlike some other extensions, first and main purpose of Clean the mess is to help you find and mercilessly close tabs you don't need, not just reorder them.

With its integrated search feature, Clean the mess! could also be used as a fast and simple tab manager, that lets you control your tabs and always find those you opened a week, a month or a year ago. And of course close those you don't find up to date anymore.

## Release

1. `npm run bump-version:__mode__`
2. `update changelog` (TBA)
3. `git commit`, `git tag`, `git push --tags` (TBA)
4. `npm run build:release` (or `npm run build:release:__platform__`)

## Development readme (outdated)

Bundled and built using `parcel` and `gulp`. `Storybook` is used to develop UI. For testing in browser, `web-ext` is used.

__UI development:__
Only bundles UI, no functionality maintained.

```sh
npm run storybook
```

__Extension dev + debug__

```sh
npm run dev:firefox # starts parcel devserver with autoreload, builds into dist/firefox

# In other terminal:

npm run firefox # opens browser where extension can be tested

# accessible from: localhost:1234
```

Dev can be started for one browser at a time only.

### Build (outdated)

Can be started for multiple browsers at once.

__Firefox:__

```sh
npm install

npm run build:firefox # builds production version into dist/firefox
npm run webext:build:firefox # packages build in dist/firefox to build/firefox/clean_the_mess-xyz.zip
```

__Chrome:__

```sh
npm install

npm run build:chrome # builds production version into dist/chrome
npm run webext:build:chrome # packages build in dist/chrome to build/chrome/clean_the_mess-xyz.zip
```
