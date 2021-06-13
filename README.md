# Clean the mess!

Hundreds of opened tabs? Dozens of useless duplicate tabs with opened emails, google searches, your favourite social networks and articles you wanted to read a month ago? Let's clean the mess!

Clean the mess! a simple addon that is designed to help you with maintaining order among opened websites. Unlike some other extensions, first and main purpose of Clean the mess is to help you find and mercilessly close tabs you don't need, not just reorder them.

With its integrated search feature, Clean the mess! could also be used as a fast and simple tab manager, that lets you control your tabs and always find those you opened a week, a month or a year ago. And of course close those you don't find up to date anymore.

## Development readme
Bundled and built using `parcel` and `gulp`. `Webpack` is used to bundle style dev. For testing in browser, `web-ext` is used.

__UI development:__
Only bundles UI, no functionality maintained.

```sh
npm run dev:ui

# in order to choose chrome or firefox, change path in src/_dev/style-dev/style.scss

# accessible from: localhost:9000
```

__Extension dev + debug__

```sh
npm run dev:firefox # starts parcel devserver with autoreload, builds into dist/firefox

# In other terminal:

npm run firefox # opens browser where extension can be tested

# accessible from: localhost:1234
```

Dev can be started for one browser at a time only.

### Build

Can be started for multiple browsers at once.

```sh
npm run build:firefox # builds production version into dist/firefox
```