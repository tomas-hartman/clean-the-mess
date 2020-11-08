# Clean the mess!

Hundreds of opened tabs? Dozens of useless duplicate tabs with opened emails, google searches, your favourite social networks and articles you wanted to read a month ago? Let's clean the mess!

Clean the mess! a simple addon that is designed to help you with maintaining order among opened websites. Unlike some other extensions, first and main purpose of Clean the mess is to help you find and mercilessly close tabs you don't need, not just reorder them.

With its integrated search feature, Clean the mess! could also be used as a fast and simple tab manager, that lets you control your tabs and always find those you opened a week, a month or a year ago. And of course close those you don't find up to date anymore.

## Development readme
Developed using `web-ext`, using standard `web-ext` APIs for run, lint and build. It is bundled using `gulp`. Both `gulp` and `web-ext` should be installed globally.

```sh
# Style development
# styles dir: src/dev/style-dev

gulp styledev

# localhost:3000
# manual copy to src/styles + chrome/ or firefox/
```

### Extension dev + debug

```sh
# Firefox
gulp firefox # starts devserver that creates dev build in dist
npm run firefox # runs browser with installed temporary addon (build from dist)

# Chrome
gulp chrome
npm run chrome

# Both
gulp
npm run start
```