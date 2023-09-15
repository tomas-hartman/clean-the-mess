import { detailed } from "../../../../../../tests/__sampleData__/detailedArray"
import { tabsOverview } from "../../../../../../tests/__sampleData__/tabsOverview"

export const useData = () => {
  return {
    tabs: detailed,
    latestTabs: detailed,
    overview: tabsOverview,
  };
};