import { Tabs } from 'webextension-polyfill';

export type DuplicateGroup = {
  url: string;
  title?: string;
  tabs: Tabs.Tab[];
  favicon?: string;
};

const createMapSetter =
  (duplicateMap: Map<string, DuplicateGroup>) => (initialMap: Map<string, DuplicateGroup>, tab: Tabs.Tab) => {
    if (!tab.url) return true;

    if (initialMap.has(tab.url)) {
      const prev = initialMap.get(tab.url);

      if (!prev) return true;

      duplicateMap.set(tab.url, {
        ...prev,
        tabs: [...prev.tabs, tab],
      });

      return true;
    }

    // branch should not trigger return from loop
    return false;
  };

export const dedupe = (tabs: Tabs.Tab[]): DuplicateGroup[] => {
  const duplicates = new Map<string, DuplicateGroup>();
  const midstep = new Map<string, DuplicateGroup>();

  const mapSetter = createMapSetter(duplicates);

  tabs.forEach(tab => {
    if (!tab.url) return;

    if (mapSetter(duplicates, tab)) return;
    if (mapSetter(midstep, tab)) return;

    midstep.set(tab.url, {
      url: tab.url,
      title: tab.title,
      tabs: [tab],
      favicon: tab.favIconUrl,
    });
  });

  return Array.from(duplicates.values());
};
