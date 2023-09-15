import { useContext } from 'react';
import { DataContext } from '../providers/DataProvider';
import { useLatestTabs } from './useLatestTabs';
import { useOverview } from './useOverview';

export type CloseTabs = (ids?: number | number[]) => Promise<void>;

export const useData = () => {
  const { tabs, ...props } = useContext(DataContext);
  const { latestTabs } = useLatestTabs({ numOfLatest: 10 });
  const { overview } = useOverview();

  return {
    tabs,
    latestTabs,
    overview,
    ...props,
  };
};
