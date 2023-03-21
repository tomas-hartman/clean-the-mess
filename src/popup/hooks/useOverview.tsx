import { useContext, useMemo } from 'react';
import { getOverview } from '../../_modules';
import { DataContext } from '../DataProvider';

export const useOverview = () => {
  const { tabs } = useContext(DataContext);

  const overview = useMemo(() => {
    if (tabs) {
      return getOverview(tabs);
    }

    return [];
  }, [tabs]);

  return { overview };
};
