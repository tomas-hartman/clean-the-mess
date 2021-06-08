# Clean the mess!

Hundreds of opened tabs? Dozens of useless duplicate tabs with opened emails, google searches, your favourite social networks and articles you wanted to read a month ago? Let's clean the mess!

Clean the mess! a simple addon that is designed to help you with maintaining order among opened websites. Unlike some other extensions, first and main purpose of Clean the mess is to help you find and mercilessly close tabs you don't need, not just reorder them.

With its integrated search feature, Clean the mess! could also be used as a fast and simple tab manager, that lets you control your tabs and always find those you opened a week, a month or a year ago. And of course close those you don't find up to date anymore.

## Development readme
Bundled and built using `parcel` and `gulp`. For testing in browser, `web-ext` is used.

```sh
# Style development
# styles dir: src/dev/style-dev

gulp styledev

# localhost:3000
# manual copy to src/styles + chrome/ or firefox/
```

### Extension dev + debug

```sh
npm run dev:firefox # starts devserver with autoreload, builds into dist/firefox

# In other terminal:

npm run firefox # opens browser where extension can be tested
```

Dev can be started for one browser at a time only.

### Build

Can be started for multiple browsers at once.

```sh
npm run build:firefox # builds production version into dist/firefox
```