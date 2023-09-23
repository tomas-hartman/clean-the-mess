import { Tabs } from 'webextension-polyfill';
import { OverviewItem } from '../popup';
import { getHash } from './helpers';
import { MakePropRequired } from '../../types';

const getOriginUrl = (tabData: Tabs.Tab) => {
  if (!tabData.url) return 'Other tabs';

  const url = new URL(tabData.url);

  if (!(url.protocol === 'http:' || url.protocol === 'https:')) {
    switch (url.protocol) {
      case 'about:':
      case 'moz-extension:':
      case 'chrome:':
        return 'Browser tabs';
      case 'file:':
        return 'Opened files';
      default:
        return 'Other tabs';
    }
  }

  if (url.hostname === 'localhost') {
    return 'Localhost';
  }

  if (url.origin) {
    return url.origin;
  }

  return 'Other tabs';
};

type Overview = {
  pinned: OverviewItem | null;
  overview: OverviewItem[];
};

type TabWithId = MakePropRequired<Tabs.Tab, 'id'>;

const hasId = (value: Tabs.Tab): value is TabWithId => 'id' in value && value['id'] !== undefined;

/**
 * Function that creates data structure for overview grouping.
 * @todo It also handles group naming, but it needs refactoring.
 * @param {Object[]} tabs - Standard tabs object from browser
 * @returns {Object[]} Sorted array of objects that are used for overview grouping
 */
export const getOverview = (tabs: Tabs.Tab[]): Overview => {
  const output: OverviewItem[] = [];
  const pinnedIds: number[] = [];

  tabs.forEach(tab => {
    const originUrl = getOriginUrl(tab);

    if (!hasId(tab)) {
      return;
    }

    if (tab.pinned) {
      pinnedIds.push(tab.id);
      return;
    }

    if (output.some(website => website.url === originUrl)) {
      const index = output.findIndex(website => website.url === originUrl);

      output[index].count += 1;
      output[index].ids.push(tab.id);
    } else {
      const key = getHash(originUrl);

      output.push({
        url: originUrl,
        count: 1,
        ids: [tab.id],
        key,
        favicon: tab.favIconUrl,
      });
    }
  });

  output.sort((a, b) => b.count - a.count);

  return {
    pinned:
      pinnedIds.length > 0
        ? {
            url: 'Pinned tabs',
            count: pinnedIds.length,
            ids: pinnedIds,
            key: getHash('Pinned tabs'),
            favicon: undefined,
          }
        : null,
    overview: output,
  };
};
