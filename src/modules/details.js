/* eslint-disable no-continue */
import locale from './locale';

/**
 * Function that returns filtered array with details for latest used group
 * @todo Work on detailed and better filtered return array
 * @param {Array} innerTabsData tabs query array
 * @param {Number} numOfLatest optional, is equal to 10 normally
 * @returns {Object[]} Array with filtered items from tabs object
 */
const getLatestUsed = (innerTabsData, numOfLatest = 10) => {
  const newTabs = innerTabsData.slice(0);
  let iterationsNum = numOfLatest;
  const latest = [];

  if (innerTabsData.length < iterationsNum) iterationsNum = innerTabsData.length;

  newTabs.sort((a, b) => a.lastAccessed - b.lastAccessed);

  for (let i = 0; i < iterationsNum; i += 1) {
    if (newTabs[i].pinned) continue;

    const output = {};

    const dateToFormat = newTabs[i].lastAccessed ? new Date(newTabs[i].lastAccessed) : new Date();
    const date = new Intl.DateTimeFormat(locale.string, locale.options).format(dateToFormat);

    output.date = date;
    output.title = newTabs[i].title;
    output.id = newTabs[i].id;
    output.url = newTabs[i].url;

    latest.push(output);
  }

  return latest;
};

/**
 * Function that returns filtered array with details for given group
 * @param {Object} _screen data passed to the screen
 * @param {Object} _tabsData tabsData object
 * @returns {Object[]}
 */
const getDetailsData = (_screen, _tabsData) => {
  if (!_screen?.options?.ids) return [];

  const { ids } = _screen?.options;
  const array = [];

  for (let i = 0; i < ids.length; i += 1) {
    array.push(..._tabsData.filter((tab) => tab.id === ids[i]));
  }

  array.sort((a, b) => b.lastAccessed - a.lastAccessed);

  return array;
};

export {
  getLatestUsed,
  getDetailsData,
};
