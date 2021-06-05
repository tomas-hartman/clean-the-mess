import { getDetailsData } from '../src/_modules';

import { tabs } from './__sampleData__/tabs';
import { tabsOverview } from './__sampleData__/tabsOverview';

it('should return array with details only for certain url', () => {
  const overviewId = 0;
  const screenObject = { name: 'details', options: tabsOverview[0] };

  const output = getDetailsData(screenObject, tabs);

  expect(output.length).toBe(tabsOverview[overviewId].ids.length);
});

// vymyslet failcase scénáře
