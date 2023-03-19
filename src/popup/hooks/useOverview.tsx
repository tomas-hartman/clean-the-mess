import { useMemo } from 'react';
import { getOverview } from '../../_modules';
import { useTabs } from './useTabs';

export const useOverview = () => {
  const { tabs } = useTabs();
  // const [tabx] = useState(tabs);
  // const [overview2, setOverview2] = useState<Overview>([]);
  // const [refreshToken, setRefreshToken] = useState(0);

  // useEffect(() => {
  //   const callback = () => setOverview2(getOverview(tabs));

  //   browser.tabs.onRemoved.addListener(callback);

  //   return browser.tabs.onRemoved.removeListener(callback);
  // });

  // useEffect(() => {
  //   // console.log('useOverview');
  //   const overviewData = getOverview(tabs);
  //   setOverview2(overviewData);
  // }, [tabs, refreshToken]);

  // console.log(overview2.length);

  // useEffect(() => {
  //   console.log('BBBBB', tabs.length);
  // });

  const overview = useMemo(() => {
    return getOverview(tabs);
  }, [tabs]);

  return { overview };
};
