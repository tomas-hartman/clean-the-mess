import { useCallback, useEffect, useState } from 'react';
import browser, { Tabs } from 'webextension-polyfill';

export const useTabs = () => {
  const [tabs, setTabs] = useState<Tabs.Tab[]>([])
  const [refreshToken, setRefreshToken] = useState(0)

  const refreshTabs = () => setRefreshToken(refreshToken + 1);

  const getTabs = useCallback(async () => await browser.tabs.query({ currentWindow: true }), []);

  useEffect(() => {
    async function getData() {
      const data = await getTabs();
      setTabs(data);
    }
    getData();
  }, [getTabs, refreshToken]);

  return { tabs, refreshTabs };
}