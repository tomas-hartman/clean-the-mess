import { handleBookmarkAll } from '../modules/bookmarks.js';
import { saveTabsOverviewData } from '../modules/helpers.js';

/**
 * This handles "overviewData"
 */
// browser.runtime.onStartup.addListener(saveTabsOverviewData);
// browser.runtime.onInstalled.addListener(saveTabsOverviewData);
// browser.tabs.onActivated.addListener(saveTabsOverviewData);
// browser.tabs.onCreated.addListener(saveTabsOverviewData);

// browser.windows.onCreated.addListener(saveTabsOverviewData);

// /** Only checks when status is changing (load, reload etc) */
// // browser.tabs.onUpdated.addListener(saveTabsOverviewData, { properties: ['status']});
// browser.tabs.onUpdated.addListener(saveTabsOverviewData);
// browser.tabs.onRemoved.addListener(saveTabsOverviewData);

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
