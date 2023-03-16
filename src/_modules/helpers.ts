/* eslint-disable no-bitwise */
import browser from 'webextension-polyfill';

/**
 * Validates if url with given protocol can be bookmarked
 * @param {string} url Url to be validated
 * @returns {boolean}
 */
export const isSupportedProtocol = (url?: string): boolean => {
  const supportedProtocols = ['https:', 'http:', 'ftp:', 'file:'];

  if(!url) return false;

  const urlObj = new URL(url);

  return supportedProtocols.indexOf(urlObj.protocol) !== -1;
};

/**
 * Checks if url has some of the special protocols, that do not work
 * well with certain features and APIs such as bookmarks
 * @param {string | undefined} url
 * @returns {Boolean}
 */
export const hasIgnoredProtocol = (url?: string): boolean => {
  const ignoredProtocols = ['about:', 'moz-extension:', 'chrome:', 'file:'];

  if(!url) return false;

  const { protocol } = new URL(url);

  return ignoredProtocols.includes(protocol);
};

/**
 * Gets information about tab of given id
 * @param {number} id - id from tabs array
 */
export const getTabDataFromId = async (id: number) => {
  const data = await browser.tabs.get(id);
  const { title, url } = data;

  return [title, url];
};

/**
 * Converts string to html-safe code. Useful for titles to be displayed.
 * @see https://stackoverflow.com/a/57448862/11243775
 * @param {string} str
 */
export const escapeHTML = (str: string) => str.replace(/[&<>'"]/g,
  (tag) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '\'': '&#39;',
    '"': '&quot;',
  }[tag]) || '');

/**
 * Function that converts string to hash. Used to set unique keys in getOverview.
 * @see https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 * @param {string} value
 * @returns {string}
 */
export const getHash = (value: string): string => {
  let hash = 0; let i; let
    chr;
  for (i = 0; i < value.length; i += 1) {
    chr = value.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return `${hash}`;
};


// Returns headerTitle for secondary screens
// TODO: make reasonable with types
export const getHeaderTitle = (overviewUrl: string | undefined, type: 'details' | 'latest', count?: number) => {
  if(type === 'details') {
    if(!overviewUrl) return '';

    try {
      return new URL(overviewUrl).host
    } catch {
      return overviewUrl
    }
  }

  if(type === 'latest') {
    return `${count} longest unused tabs`
  }

  return '';
};

/**
 * @param {number | undefined} id Tab id
 */
export const goToTab = async (id: number | undefined) => {
  if(!id) return;

  await browser.tabs.update(id, { active: true });
};
