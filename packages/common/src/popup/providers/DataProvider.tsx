import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import browser, { Tabs } from 'webextension-polyfill';
import { getRemovableIds } from './DataProvider.utils';
import { dedupe } from '../../_modules/duplicates';

export type CloseTabs = (ids?: number | number[], options?: { keepPinned: boolean }) => Promise<void>;

const useDataProviderData = () => {
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
    browser.tabs.onRemoved.addListener(refreshData);
    browser.tabs.onUpdated.addListener(refreshData);

    return () => {
      browser.tabs.onRemoved.removeListener(refreshData);
      browser.tabs.onUpdated.removeListener(refreshData);
    };
  }, [refreshData]);

  return {
    tabs,
    closeTabs,
    duplicates,
  };
};

type DataContextProps = ReturnType<typeof useDataProviderData>;

export const DataContext = createContext({} as DataContextProps);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useDataProviderData();

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
