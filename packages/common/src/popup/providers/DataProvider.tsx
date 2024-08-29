import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import browser, { Tabs } from 'webextension-polyfill';
import { getRemovableIds } from './DataProvider.utils';
import { dedupe, DuplicateGroup } from '../../_modules/duplicates';

export type CloseTabs = (ids?: number | number[], options?: { keepPinned: boolean }) => Promise<void>;

type DataContextProps = {
  tabs: Tabs.Tab[];
  closeTabs: CloseTabs;
  duplicates: DuplicateGroup[];
};

export const DataContext = createContext<DataContextProps>({} as DataContextProps);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tabs, setTabs] = useState<Tabs.Tab[]>([]);

  const duplicates = useMemo(() => dedupe(tabs).sort((a, b) => b.tabs.length - a.tabs.length), [tabs]);

  const closeTabs = useCallback<CloseTabs>(
    async (ids, options) => {
      if (!ids) return;

      const keepPinned = options?.keepPinned ?? false;
      const removableIds = getRemovableIds(ids, tabs, keepPinned);

      await browser.tabs.remove(removableIds);
    },
    [tabs],
  );

  const refreshData = useCallback(async () => {
    const data = await browser.tabs.query({ currentWindow: true });

    setTabs(data);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    browser.tabs.onRemoved.addListener(() => {
      refreshData();
    });

    return browser.tabs.onRemoved.removeListener(() => refreshData());
  }, [refreshData]);

  const value = {
    tabs,
    closeTabs,
    duplicates,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
