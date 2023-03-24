import { tabs } from "../../../../tests/__sampleData__/tabs"
import { tabsOverview } from "../../../../tests/__sampleData__/tabsOverview"
import { latest } from "../../../../tests/__sampleData__/latestDetailedArray"

export const useData = () => {
  return {
    tabs,
    latestTabs: latest,
    overview: tabsOverview,
  };
};