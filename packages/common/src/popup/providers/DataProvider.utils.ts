import { Tabs } from 'webextension-polyfill';

export const getRemovableIds = (ids: number | number[], tabs: Tabs.Tab[], keepPinned: boolean) => {
  const removableIds = Array.isArray(ids) ? ids : [ids];

  if (keepPinned) {
    const pinnedTabs = tabs.filter(tab => tab.pinned);
    return removableIds.filter(id => !pinnedTabs.find(tab => tab.id === id));
  }

  return removableIds;
};
