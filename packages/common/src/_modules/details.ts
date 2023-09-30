/* eslint-disable no-continue */
import { Tabs } from 'webextension-polyfill';
import { ScreenProps } from '../popup';
import { locale } from './locale';

export const getFormatedDate = (lastAccessed: number) => {
  const dateToFormat = new Date(lastAccessed);
  return new Intl.DateTimeFormat(locale.string, locale.options).format(dateToFormat);
};

// This would be replaced with stg. more sophisticated with i18n
const getPluralizedTimeString = (num: number, str: string) => {
  const ending = num === 1 ? '' : 's';

  return `${num} ${str + ending} ago`;
};

export const getTimePassed = (lastAccessed: number) => {
  const now = new Date().getTime();
  const difference = now - lastAccessed;
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const years = Math.floor(days / 365);

  if (years > 0) return getPluralizedTimeString(years, 'year');
  if (weeks > 0) return getPluralizedTimeString(weeks, 'week');
  if (days > 0) return getPluralizedTimeString(days, 'day');
  if (hours > 0) return getPluralizedTimeString(hours, 'hour');
  if (minutes > 0) return getPluralizedTimeString(minutes, 'minute');

  return getPluralizedTimeString(seconds, 'second');
};

/**
 * Function that returns filtered array with details for latest used group
 * @todo Work on detailed and better filtered return array
 * @param {Tabs.Tab[]} innerTabsData tabs query array
 * @param {Number} numOfLatest optional, is equal to 10 normally
 * @returns {Object[]} Array with filtered items from tabs object
 * @todo make more efficient
 */
const getLatestUsed = (innerTabsData: Tabs.Tab[], numOfLatest = 10): Tabs.Tab[] => {
  const newTabs = innerTabsData.slice(0);
  let iterationsNum = numOfLatest;
  const latest = [];

  if (innerTabsData.length < iterationsNum) iterationsNum = innerTabsData.length;

  newTabs.sort((a, b) => {
    if (!a.lastAccessed || !b.lastAccessed) return 0;

    return a.lastAccessed - b.lastAccessed;
  });

  for (let i = 0; i < iterationsNum; i += 1) {
    const lastAccessed = newTabs[i].lastAccessed;

    if (newTabs[i].pinned || !lastAccessed) continue;

    const dateToFormat = new Date(lastAccessed);
    const date = new Intl.DateTimeFormat(locale.string, locale.options).format(dateToFormat);

    latest.push({
      ...newTabs[i],
      date,
    });
  }

  return latest;
};

/**
 * Function that returns filtered array with details for given group
 * @param {Object} _screen data passed to the screen
 * @param {Object} _tabsData tabsData object
 * @returns {Object[]}
 */
const getDetailsData = (_screen: ScreenProps, _tabsData: Tabs.Tab[]) => {
  if (!_screen?.options?.ids) return [];

  const { ids } = _screen?.options;
  const array = [];

  for (let i = 0; i < ids.length; i += 1) {
    array.push(..._tabsData.filter(tab => tab.id === ids[i]));
  }

  array.sort((a, b) => {
    if (b.lastAccessed && a.lastAccessed) {
      return b.lastAccessed - a.lastAccessed;
    }

    return b.index - a.index;
  });

  return array;
};

export { getLatestUsed, getDetailsData };
