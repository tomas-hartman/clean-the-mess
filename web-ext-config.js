module.exports = {
  verbose: false,
  // artifactsDir: './build',
  // sourceDir: './src',
  ignoreFiles: [
    './dev',
    './icons/unused',
  ],
  run: {
    /**
    * Urls that should be opened at start - there will be lots of them
    */
    startUrl: [
      'www.mozilla.com',
      'developer.mozilla.org',
      'www.example.com',
      'about:blank',
      'www.example.com/1',
      'www.example.com/2',
      'www.example.com/3',
      'www.example.com/4',
      'www.example.com/5',
      'about:settings',
      'about:debugging',
      'https://www.mediawiki.org/wiki/API:Lists',
      'https://www.mediawiki.org/wiki/API:Tutorial',
      'https://www.mediawiki.org/wiki/API:Tutorial',
      'https://www.google.com/search?source=hp&ei=kl-gX_riBpKgUPfsregG&q=mozilla&oq=mozilla&gs_lcp=CgZwc3ktYWIQDFAAWABgnipoAHAAeACAAQCIAQCSAQCYAQCqAQdnd3Mtd2l6&sclient=psy-ab&ved=0ahUKEwj686zSzeTsAhUSEBQKHXd2C20Q4dUDCAo',
      'https://www.google.com/search?ei=l1-gX_rROIGHjLsPkYuwsAY&q=c%2B%2B&oq=c%2B%2B&gs_lcp=CgZwc3ktYWIQAzIHCAAQsQMQQzICCAAyAggAMgQIABBDMgIIADICCAAyAggAMgIIADICCAAyAggAOgQIABBHOggIABCxAxCDAToFCAAQsQNQvtMBWITZAWC32gFoAHADeACAAXCIAYYCkgEDMi4xmAEAoAEBqgEHZ3dzLXdpesgBCMABAQ&sclient=psy-ab&ved=0ahUKEwi6-Y_VzeTsAhWBA2MBHZEFDGYQ4dUDCAw&uact=5',
      'https://www.google.com/search?ei=tF-gX6erJrWbjLsP9riEkAY&q=stackoverflow&oq=stackoverflow&gs_lcp=CgZwc3ktYWIQAzICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAA6BAgAEEc6BAgAEEM6CAgAELEDEIMBOgUIABCxAzoHCAAQsQMQQzoECC4QQzoICC4QsQMQgwE6AgguUNlIWKJZYM1aaABwBHgAgAFXiAHVB5IBAjEzmAEAoAEBqgEHZ3dzLXdpesgBCMABAQ&sclient=psy-ab&ved=0ahUKEwin1efizeTsAhW1DWMBHXYcAWIQ4dUDCAw&uact=5',
      'https://www.google.com/search?ei=wF-gX-b_PJGdjLsP_qSu4AU&q=javascript&oq=javascript&gs_lcp=CgZwc3ktYWIQAzIHCAAQsQMQQzICCAAyBAgAEEMyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAOgQIABBHOgUIABCxAzoICAAQsQMQgwE6CAguELEDEIMBOgIILjoFCC4QsQNQ71lY_GRgk2ZoAHADeACAAVOIAfUFkgECMTCYAQCgAQGqAQdnd3Mtd2l6yAEIwAEB&sclient=psy-ab&ved=0ahUKEwjm39rozeTsAhWRDmMBHX6SC1wQ4dUDCAw&uact=5',
      'https://www.google.com/search?ei=zl-gX9PAOLujjLsPm5W4qAY&q=node.js&oq=node.js&gs_lcp=CgZwc3ktYWIQAzICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAA6BAgAEEc6BAgAEEM6CAgAELEDEIMBOgUIABCxAzoFCC4QsQM6BwgAELEDEENQlU1Y_lNg4VRoAHADeACAAWKIAawEkgEBN5gBAKABAaoBB2d3cy13aXrIAQjAAQE&sclient=psy-ab&ved=0ahUKEwjT36zvzeTsAhW7EWMBHZsKDmUQ4dUDCAw&uact=5',
      'https://eslint.org/docs/rules/no-unused-vars',
      'https://webpack.js.org/concepts/',
      'https://www.google.com/search?client=firefox-b-d&q=webpack+and+web+extensions',
      'https://medium.com/@Morikko/developing-your-web-extension-with-the-best-tools-213207c2b6b5',
      'https://github.com/tomas-hartman/clean-the-mess/milestone/6',
      'https://extensionworkshop.com/documentation/develop/web-ext-command-reference/',
      'https://extensionworkshop.com/documentation/develop/web-ext-command-reference/',
      'https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/',
      'https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#web-ext-run',
      'https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/',
      'https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#global-options',
      'https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#global-options',
      'https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#global-options',
      'https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#global-options',
      'https://extensionworkshop.com/documentation/develop/getting-…ith-web-ext/#setting-option-defaults-in-a-configuration-file',
      'https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#overwrite-dest',
      'https://extensionworkshop.com/documentation/develop/web-ext-command-reference/',
      'https://www.google.com/search?client=firefox-b-d&q=web-ext+chromium',
      'https://hacks.mozilla.org/2019/10/developing-cross-browser-extensions-with-web-ext-3-2-0/',
      'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands',
      'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities',
      'https://github.com/mozilla/webextension-polyfill#installation',
      'https://dev.to/ramitmittal/webextension-polyfill-for-cross-browser-compatibility-1b55',
      'https://developer.chrome.com/extensions/tut_debugging',
      'https://www.google.com/search?client=firefox-b-d&ei=G0efX-_e…t=psy-ab&ved=0ahUKEwiv2JOWwuLsAhVPEncKHR5iDSUQ4dUDCAw&uact=5',
      'https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Browser_styles',
      'https://developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options',
      'https://www.google.com/search?client=firefox-b-d&q=web-ext+tabs',
      'about:debugging#/runtime/this-firefox',
    ],
  },
};
