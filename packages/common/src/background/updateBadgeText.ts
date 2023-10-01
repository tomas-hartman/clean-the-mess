import browser from 'webextension-polyfill';
import { OPTION_TYPE } from '../options';

export const updateBadgeText = async () => {
  const storage = await browser.storage.sync.get(OPTION_TYPE.SHOW_TABS_LABEL);

  if (storage.showTabsLabel) {
    const tabCount = (await browser.tabs.query({ currentWindow: true })).length;

    browser.browserAction.setBadgeText({ text: `${tabCount}` });
    return;
  }

  browser.browserAction.setBadgeText({ text: null });
};
