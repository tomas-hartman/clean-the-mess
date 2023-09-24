import { Tabs } from 'webextension-polyfill';

export type DuplicateGroup = {
  url?: string;
  tabs: Tabs.Tab[];
  // favicon?: string;
};

// TODO: Try another approach for better performance
export const dedupe = (arr: Tabs.Tab[]) => {
  const { duplicates } = arr.reduce<{ original: Tabs.Tab[]; duplicates: DuplicateGroup[] }>(
    (prev, current) => {
      if (prev.original.length < 1) return prev;

      const { duplicates, rest } = prev.original.reduce<{ duplicates: Tabs.Tab[]; rest: Tabs.Tab[] }>(
        (prevReduced, item) => {
          if (item.url === current.url) {
            return {
              ...prevReduced,
              duplicates: [...prevReduced.duplicates, item],
            };
          }

          return {
            ...prevReduced,
            rest: [...prevReduced.rest, item],
          };
        },
        { duplicates: [], rest: [] },
      );

      if (!duplicates[0]) {
        return prev;
      }

      if (duplicates.length <= 1)
        return {
          ...prev,
          original: rest,
        };

      return {
        original: rest,
        duplicates: [...prev.duplicates, { url: duplicates[0].url, tabs: duplicates }],
      };
    },
    { original: arr, duplicates: [] },
  );

  return duplicates;
};
