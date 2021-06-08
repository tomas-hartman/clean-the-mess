import { getHeaderTitle } from '../src/_modules';
import { tabsOverview } from './__sampleData__/tabsOverview';

it('getHeaderTitle should return correct results for details', () => {
  const headerTitle = getHeaderTitle('stackoverflow.com', 'details');

  expect(headerTitle).toBe('stackoverflow.com');
});

it('getHeaderTitle should return correct results for latest', () => {
  const headerTitle = getHeaderTitle('', 'latest', 10);

  expect(headerTitle).toBe('10 longest unused tabs');
});

it('getHeaderTitle should return nothing for \'\'', () => {
  const headerTitle = getHeaderTitle(1, '', tabsOverview);

  expect(headerTitle).toBe(null);
});
