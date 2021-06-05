/* eslint-disable no-bitwise */

/**
 * Validates if url with given protocol can be bookmarked
 * @param {string} url Url to be validated
 * @returns {boolean}
 */
const isSupportedProtocol = (url) => {
  const supportedProtocols = ['https:', 'http:', 'ftp:', 'file:'];
  const urlObj = new URL(url);

  return supportedProtocols.indexOf(urlObj.protocol) !== -1;
};

/**
 * Checks if url has some of the special protocols, that do not work
 * well with certain features and APIs such as bookmarks
 * @param {string} url
 * @returns {Boolean}
 */
const hasIgnoredProtocol = (url) => {
  const ignoredProtocols = ['about:', 'moz-extension:', 'chrome:', 'file:'];
  const { protocol } = new URL(url);

  if (ignoredProtocols.includes(protocol)) {
    return true;
  } return false;
};

/**
 * Gets information about tab of given id
 * @param {number} id - id from tabs array
 */
const getTabDataFromId = async (id) => {
  const data = await browser.tabs.get(id);
  const { title, url } = await data;

  return [title, url];
};

/**
 * Converts string to html-safe code. Useful for titles to be displayed.
 * @see https://stackoverflow.com/a/57448862/11243775
 * @param {string} str
 */
const escapeHTML = (str) => str.replace(/[&<>'"]/g,
  (tag) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '\'': '&#39;',
    '"': '&quot;',
  }[tag]));

/**
 * Function that converts string to hash. Used to set unique keys in getOverview.
 * @see https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 * @param {string} value
 * @returns {string}
 */
const getHash = (value) => {
  let hash = 0; let i; let
    chr;
  for (i = 0; i < value.length; i += 1) {
    chr = value.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

// Returns headerTitle for secondary screens
const getHeaderTitle = (overviewUrl, type, count) => {
  let headerTitle = '';

  if (type === 'details') {
    try {
      headerTitle = new URL(overviewUrl).host;
    } catch (error) {
      if (overviewUrl) {
        headerTitle = overviewUrl;
      } else headerTitle = '';
    }
  } else if (type === 'latest') {
    headerTitle = `${count} longest unused tabs`;
  } else headerTitle = null;

  return headerTitle;
};

export {
  isSupportedProtocol,
  hasIgnoredProtocol,
  getTabDataFromId,
  escapeHTML,
  getHash,
  getHeaderTitle,
};
