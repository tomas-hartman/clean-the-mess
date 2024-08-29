import browser from 'webextension-polyfill';
import { handleBookmarkAll } from '../_modules';
import { updateBadgeText } from './updateBadgeText';
import { setupOptionsAfterInstall } from '../options/options';
import { BACKGROUND_EVENT } from './types';
import { refreshOptions } from './refreshOptions';
import { isChrome } from '../popup/utils';

const handleChromeIconChange = () => {
  isChrome() &&
    browser.browserAction.setIcon({
      path: {
        16: '../icons/png/ico-dark-16.png',
        32: '../icons/png/ico-dark-32.png',
        128: '../icons/png/ico-dark-128.png',
      },
    });
};

browser.runtime.onMessage.addListener(message => {
  switch (message.type) {
    case BACKGROUND_EVENT.BOOKMARK_ALL:
      handleBookmarkAll(message.data);
      break;

    case BACKGROUND_EVENT.REFRESH_OPTIONS:
      refreshOptions();
      break;

    case BACKGROUND_EVENT.DARK_SCHEME:
      handleChromeIconChange();
      break;

    case BACKGROUND_EVENT.LOGGER:
      console.log('[LOGGER]', ...message.data);
      break;

    default:
      console.warn('Incorrect message type. Received message:');
      console.log(message);
      break;
  }
});

browser.runtime.onInstalled.addListener(() => {
  setupOptionsAfterInstall();
});

browser.tabs.onUpdated.addListener(() => {
  updateBadgeText();
});

browser.tabs.onRemoved.addListener(() => {
  updateBadgeText();
});
