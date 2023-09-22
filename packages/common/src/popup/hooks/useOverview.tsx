import { useContext, useMemo } from 'react';
import { getOverview } from '../../_modules';
import { DataContext } from '../providers/DataProvider';

export const useOverview = () => {
  const { tabs } = useContext(DataContext);

  const overview = useMemo(() => {
    if (tabs) {
      return getOverview(tabs);
    }

    return { pinned: null, overview: [] };
  }, [tabs]);

  return overview;
};
