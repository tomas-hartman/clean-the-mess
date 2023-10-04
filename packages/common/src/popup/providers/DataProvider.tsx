import { createContext, FC, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import browser, { Tabs } from 'webextension-polyfill';
import { getRemovableIds } from './DataProvider.utils';
import { dedupe, DuplicateGroup } from '../../_modules/duplicates';

export type CloseTabs = (ids?: number | number[], options?: { keepPinned: boolean }) => Promise<void>;

type DataContextProps = {
  tabs: Tabs.Tab[];
  closeTabs: CloseTabs;
  refreshTabs: () => void;
  duplicates: DuplicateGroup[];
};

export const DataContext = createContext<DataContextProps>({} as DataContextProps);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tabs, setTabs] = useState<Tabs.Tab[]>([]);
  const [refreshToken, setRefreshToken] = useState(0);

  const refreshTabs = useCallback(() => {
    setRefreshToken(refreshToken + 1);
  }, [refreshToken]);

  const duplicates = useMemo(() => dedupe(tabs).sort((a, b) => b.tabs.length - a.tabs.length), [tabs]);

  const closeTabs = useCallback<CloseTabs>(
    async (ids, options) => {
      if (!ids) return;

      const keepPinned = options?.keepPinned ?? false;
      const removableIds = getRemovableIds(ids, tabs, keepPinned);

      await browser.tabs.remove(removableIds);
      refreshTabs();
    },
    [refreshTabs, tabs],
  );

  useEffect(() => {
    async function getData() {
      const data = await browser.tabs.query({ currentWindow: true });

      setTabs(data);
    }
    getData();
  }, [refreshToken]);

  const value = {
    tabs,
    closeTabs,
    refreshTabs,
    duplicates,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
