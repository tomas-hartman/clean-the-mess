import { handleBookmarkAll } from '../modules/bookmarks.js';

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
  console.log('Message', message);

  switch (message.type) {
    case 'bookmark-all':
      handleBookmarkAll(message.data);
      break;

      // This only works in chrome
    case 'darkScheme':
      console.log('darkScheme');
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
