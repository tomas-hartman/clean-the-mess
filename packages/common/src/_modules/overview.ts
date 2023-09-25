import { Tabs } from 'webextension-polyfill';
import { OverviewItem } from '../popup';
import { getHash } from './helpers';

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

// This was the fastest algorithm I tried
export const getOverview = (tabs: Tabs.Tab[]): Overview => {
  const overviewMap = new Map<string, OverviewItem>();
  const pinnedIdsSet = new Set<number>();

  for (const tab of tabs) {
    if (!tab.id) continue;

    const groupName = getOriginUrl(tab);

    if (tab.pinned) {
      pinnedIdsSet.add(tab.id);
      continue;
    }

    if (overviewMap.has(groupName)) {
      const prev = overviewMap.get(groupName);

      if (!prev) continue;

      prev.ids.push(tab.id);
      overviewMap.set(groupName, prev);
      continue;
    }

    const key = getHash(groupName);

    overviewMap.set(groupName, {
      key,
      url: groupName,
      favicon: tab.favIconUrl,
      ids: [tab.id],
    });
  }

  const pinnedGroup: OverviewItem = {
    url: 'Pinned tabs',
    ids: Array.from(pinnedIdsSet),
    key: getHash('Pinned tabs'),
    favicon: undefined,
  };

  const overviewGroup = Array.from(overviewMap.values()).sort((a, b) => b.ids.length - a.ids.length);

  return {
    pinned: pinnedIdsSet.size > 0 ? pinnedGroup : null,
    overview: overviewGroup,
  };
};
