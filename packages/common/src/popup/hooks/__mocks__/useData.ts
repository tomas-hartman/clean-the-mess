import { detailed } from '../../../../../../tests/__sampleData__/detailedArray';
import { tabsOverview } from '../../../../../../tests/__sampleData__/tabsOverview';
import overviewData from '../../../../dev/search-dev/overview-data';
import { useData as mockedUseData } from '../useData';

export const useData = (): ReturnType<typeof mockedUseData> => ({
  tabs: detailed,
  latestTabs: detailed,
  overview: tabsOverview,
  duplicates: [{ ...tabsOverview[0], tabs: [detailed[0]] }],
  pinned: overviewData[0],
  closeTabs: () => Promise.resolve(),
});
