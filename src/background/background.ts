import browser from 'webextension-polyfill';
import { handleBookmarkAll } from '../_modules';

/**
 * Listeners to messages from popup.js
 * Popup messages handler. Handles how should be messages from popup.js treated.
 *
 * @example
 * {
 *   type: "bookmark-all" | "get-overview" | ...
 *   data: {}
 * }
 */
browser.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case 'bookmark-all':
      handleBookmarkAll(message.data);
      break;

      // This only works in chrome
    case 'darkScheme':
      // @ts-expect-error Chrome-only feature TODO
      chrome.browserAction.setIcon({
        path: {
          16: '../icons/png/ico-dark-16.png',
          32: '../icons/png/ico-dark-32.png',
          128: '../icons/png/ico-dark-128.png',
        },
      });
      break;

    default:
      console.warn('Incorrect message type. Received message:');
      console.log(message);
      break;
  }
});
