import { useContext, useMemo } from 'react';
import { getLatestUsed } from '../../_modules';
import { DataContext } from '../providers/DataProvider';

type UseLatestTabsProps = {
  numOfLatest: number;
};

export const useLatestTabs = ({ numOfLatest }: UseLatestTabsProps) => {
  const { tabs } = useContext(DataContext);

  const latestTabs = useMemo(() => {
    if (tabs) {
      return getLatestUsed(tabs, numOfLatest || 10);
    }

    return [];
  }, [numOfLatest, tabs]);

  return { latestTabs };
};
