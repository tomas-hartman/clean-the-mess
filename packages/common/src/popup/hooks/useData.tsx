import { useDataContext } from '../providers/DataProvider';
import { useLatestTabs } from './useLatestTabs';
import { useOverview } from './useOverview';

export const useData = () => {
  const { tabs, ...props } = useDataContext();
  const { latestTabs } = useLatestTabs({ numOfLatest: 10 });
  const overview = useOverview();

  return {
    tabs,
    latestTabs,
    ...overview,
    ...props,
  };
};
