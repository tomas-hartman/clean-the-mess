/* eslint-disable no-await-in-loop */
import browser, { Tabs } from 'webextension-polyfill';
import { OverviewItem } from '../popup';
import { isSupportedProtocol, getTabDataFromId, hasIgnoredProtocol } from './helpers';
import { ClientEvent } from './listeners';
import { BACKGROUND_EVENT } from '../background';

/**
 * Background
 */

/** Sends bookmark-all message */
export const bookmarkAll = (overviewObject: OverviewItem, oId: number) => {
  browser.runtime.sendMessage({ type: BACKGROUND_EVENT.BOOKMARK_ALL, data: { overviewObject, index: oId } });
};

const bookmarkTabsToFolder = async (tabIds: number[], parentId: string | null) => {
  for (let i = 0; i < tabIds.length; i += 1) {
    try {
      const [title, url] = await getTabDataFromId(tabIds[i]);

      /**
       * This does not search only in the given folder but everywhere!
       * Currently a feature (to keep bookmarks clean), but it could be reconsidered.
       * @todo Fix empty string
      */
      const duplicates = await browser.bookmarks.search(url || "");

      if (duplicates.length === 0 && isSupportedProtocol(url)) {
        await browser.bookmarks
          .create({ title, url, parentId: parentId ?? undefined })
          .catch((err) => console.log(err));
      } else console.log(`Item with url ${url} already exists and was skipped.`);
    } catch (err) {
      console.error(err);
    }
  }
};

/**
 * Handles merge in bookmarks folder and duplicate folder/bookmarks names.
 *
 * @param {array} tabIds Array of ids of current tabs
 * @param {array} foundItems Array of items already found in bookmarks (usually should be 0 or 1)
 * @param {string} folderName Name of new folder in case it should be created
 */
const mergeBookmarksInFolder = async (tabIds: number[], foundItems: browser.Bookmarks.BookmarkTreeNode[], folderName: string) => {
  // Returns first folder of its name into which I will add the new files
  // foundItems.find((item) => item.type === 'folder')

  const folder = foundItems[0];

  if (!folder) {
    const newFolder = await browser.bookmarks.create({ title: folderName });
    await bookmarkTabsToFolder(tabIds, newFolder.id);

    console.log('Items added to new folder!');

    return;
  }

  const parentId = folder.id;
  const folderChildren = await browser.bookmarks.getChildren(parentId);

  for (let i = 0; i < tabIds.length; i += 1) {
    (async () => {
      const [title, url] = await getTabDataFromId(tabIds[i]);

      if (!isSupportedProtocol(url)) return;

      const isAlreadyBookmarked = folderChildren.some((child) => child.title === title);

      if (!isAlreadyBookmarked) {
        await browser.bookmarks
          .create({ title, url, parentId })
          .catch((err) => console.log(err));

        console.log('Items were merged with those from folder.');
      } else console.log(`Item with url ${url} is already in folder ${folderName} and was skipped.`);
    })();
  }
};

type BookmarkSetter = {
  overviewObject: OverviewItem,
  index: number
}

/**
 * Handles bookmark-all calls.
 *
 * 1. assumes folder-name and checks if given folder name already exists
 * 2. if not, it creates the folder and adds all of them in the folder
 * 3. if so, it merges new items with the items already found in the folder
 *
 * Duplicate bookmarks are always skipped. In case of duplicate folders, first folder is used.
 *
 * @param {Object} _data Data object containing tabsOverviewId
 * @param {Object} _data.overviewObject tabsOverview item
 * @param {number} _data.index tabsOverview id
 */
export const handleBookmarkAll = async (_data: BookmarkSetter) => {
  const { overviewObject, index } = _data;
  const { bookmarks } = browser;


  if (!overviewObject.ids) {
    console.warn("overview object had no ids")
    return;
  }

  // It does not merge items in bookmark root
  if (overviewObject.ids?.length === 1) {
    await bookmarkTabsToFolder(overviewObject.ids, null);
    console.log('done');

    // This throws an error in refactor!
    browser.runtime.sendMessage({ type: ClientEvent.ITEMS_BOOKMARKED, data: { index } });

    return;
  }

  const folderName = overviewObject.url ? (new URL(overviewObject.url)).hostname : "Bookmark folder";
  const searchResults = await bookmarks.search({ title: folderName });

  if (await searchResults.length === 0) {
    const newFolder = await bookmarks.create({ title: folderName });

    await bookmarkTabsToFolder(overviewObject.ids, newFolder.id);

    console.log('Items added to new folder!');
  } else {
    await mergeBookmarksInFolder(overviewObject.ids, searchResults, folderName);
  }

  browser.runtime.sendMessage({ type: ClientEvent.ITEMS_BOOKMARKED, data: { index } });
};

/**
 * Popup
 */

/**
 * Adds bookmark status to given element
 * @param {Object} item Object from screen detailed object
 */
export const getBookmarkStatus = async (item: Tabs.Tab) => {
  // I will not check for duplicate items with some special protocols in bookmarks
  if (hasIgnoredProtocol(item.url)) return 'hidden';

  const bookmarks = await browser.bookmarks.search({ url: item.url });

  if (bookmarks.length > 0) {
    //   elm.setAttribute('title', 'This url is already bookmarked');
    return 'bookmarked';
  }

  return 'bookmark-close';
};

/**
 * Saves element with given _id as a new bookmark with given
 * title and url and plays browser action with icon
 * @param {string} url
 * @param {string} title
 * @param {number} _id
 */
export const bookmarkTab = async (data: Tabs.Tab) => {
  const { url, title } = data;

  if (isSupportedProtocol(url)) {
    // check if folder exists and create special folder?
    await browser.bookmarks
      .create({ title, url })
      .catch((err) => console.log(err));

    // await browser.browserAction.setIcon({
    //   path: '../icons/btn-bookmark-star-blue.svg',
    // });

    // new Promise((resolve, _reject) => {
    //   setTimeout(() => {
    //     browser.browserAction.setIcon({});
    //     resolve();
    //   }, 700);
    // });

    console.log('New bookmark created');
  }
};
