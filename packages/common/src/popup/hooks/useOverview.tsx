import { useMemo } from 'react';
import { getOverview } from '../../_modules';
import { useDataContext } from '../providers';

export const useOverview = () => {
  const { tabs } = useDataContext();

  const overview = useMemo(() => {
    if (tabs) {
      return getOverview(tabs);
    }

    return { pinned: null, overview: [] };
  }, [tabs]);

  return overview;
};
