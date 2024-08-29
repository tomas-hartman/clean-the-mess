import { useMemo } from 'react';
import { getLatestUsed } from '../../_modules';
import { useDataContext } from '../providers';

type UseLatestTabsProps = {
  numOfLatest: number;
};

// TODO: add sort feature!
export const useLatestTabs = ({ numOfLatest }: UseLatestTabsProps) => {
  const { tabs } = useDataContext();

  const latestTabs = useMemo(() => {
    if (tabs) {
      return getLatestUsed(tabs, numOfLatest || 10);
    }

    return [];
  }, [numOfLatest, tabs]);

  return { latestTabs };
};
