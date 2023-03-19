import { useMemo } from 'react';
import { getLatestUsed } from '../../_modules';
import { useTabs } from './useTabs';

type UseLatestTabsProps = {
  numOfLatest: number;
};

export const useLatestTabs = ({ numOfLatest }: UseLatestTabsProps) => {
  const { tabs } = useTabs();

  const latestTabs = useMemo(() => {
    return getLatestUsed(tabs, numOfLatest || 10);
  }, [numOfLatest, tabs]);

  return { latestTabs };
};
