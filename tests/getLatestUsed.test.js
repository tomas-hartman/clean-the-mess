import { getLatestUsed } from '../src/modules/details.refactor';
import { tabs } from './__sampleData__/tabs';

it('should return formated array', () => {
  const output = getLatestUsed(tabs, 5);

  expect(output.length).toBe(5);
});

it('should return formated array of 10', () => {
  const output = getLatestUsed(tabs);

  expect(output.length).toBe(10);
});

it('should not fail if getLatestCount is bigger than tabs.length', () => {
  const getLatestCount = tabs.length + 10;
  const output = getLatestUsed(tabs, getLatestCount);

  expect(output.length).toBe(tabs.length);
});

it('should skip pinned items', () => {
  const sampleMinifiedTabs = [
    {
      id: 6,
      index: 0,
      windowId: 1,
      pinned: true,
      status: 'complete',
      lastAccessed: 1589322068733,
      url: 'https://www.google.com',
      title: 'Google.com but pinned',
    },
    {
      id: 7,
      index: 1,
      windowId: 1,
      pinned: false,
      status: 'complete',
      lastAccessed: 1589322068733,
      url: 'https://www.google.com',
      title: 'Google.com',
    },

  ];

  const output = getLatestUsed(sampleMinifiedTabs, 10);

  expect(output.length).toBe(1);
});
