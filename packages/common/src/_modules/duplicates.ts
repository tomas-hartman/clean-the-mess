import { Tabs } from 'webextension-polyfill';

export type DuplicateGroup = {
  url: string;
  tabs: Tabs.Tab[];
  favicon?: string;
};

const createMapSetter =
  (duplicateMap: Map<string, DuplicateGroup>) => (initialMap: Map<string, DuplicateGroup>, tab: Tabs.Tab) => {
    if (!tab.url) return;

    if (initialMap.has(tab.url)) {
      const prev = initialMap.get(tab.url);

      if (!prev) return;

      duplicateMap.set(tab.url, {
        ...prev,
        tabs: [...prev.tabs, tab],
      });

      return;
    }
  };

export const dedupe = (tabs: Tabs.Tab[]): DuplicateGroup[] => {
  const duplicates = new Map<string, DuplicateGroup>();
  const midstep = new Map<string, DuplicateGroup>();

  tabs.forEach(tab => {
    if (!tab.url) return;

    const mapSetter = createMapSetter(duplicates);

    mapSetter(duplicates, tab);
    mapSetter(midstep, tab);

    midstep.set(tab.url, {
      url: tab.url,
      tabs: [tab],
      favicon: tab.favIconUrl,
    });
  });

  return Array.from(duplicates.values());
};
