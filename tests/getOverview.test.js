import { getOverview } from '../src/modules/overview';
import { tabs } from './__sampleData__/tabs';

it('should return correct overview data', () => {
  const output = getOverview(tabs);

  expect(output).toMatchSnapshot();
});

it('overview should have valid properties', () => {
  const sampleMinifiedTabs = [
    {
      id: 5,
      index: 0,
      windowId: 1,
      pinned: false,
      status: 'complete',
      lastAccessed: 1589322068715,
      audible: false,
      mutedInfo: {
        muted: false,
      },
      sharingState: {
        camera: false,
        microphone: false,
      },
      successorTabId: -1,
      url: 'https://www.google.com/?q=1',
      title: 'Google jedna',
    },
    {
      id: 7,
      index: 1,
      windowId: 1,
      pinned: false,
      status: 'complete',
      lastAccessed: 1589831142586,
      audible: false,
      mutedInfo: {
        muted: false,
      },
      sharingState: {
        camera: false,
        microphone: false,
      },
      successorTabId: -1,
      url: 'https://www.google.com/?q=2',
      title: 'Google 2',
    },
    {
      id: 15,
      index: 2,
      windowId: 1,
      pinned: false,
      status: 'complete',
      lastAccessed: 1589831456789,
      audible: false,
      mutedInfo: {
        muted: false,
      },
      sharingState: {
        camera: false,
        microphone: false,
      },
      successorTabId: -1,
      url: 'https://www.example.com/?q=1',
      title: 'Example 1',
    },
  ];
  const output = getOverview(sampleMinifiedTabs);
  const item = output[0];

  expect(output).toBeInstanceOf(Array);
  expect(output.length).toBe(2); // because 2 x google and 1 x example

  expect(item).toBeInstanceOf(Object);
  expect(item).toHaveProperty('url');
  expect(item).toHaveProperty('count');
  expect(item).toHaveProperty('ids');

  expect(item.ids).toBeInstanceOf(Array);
  expect(item.ids.length).toBe(item.count);

  expect(item.url).toBe('https://www.google.com');
});

describe('Output of url/title', () => {
  it.each([
    ['about:', { url: 'about:debugging', title: 'about:debugging' }, 'Browser tabs'],
    ['moz-extension:', { url: 'moz-extension://58ee5ecd-6e4e-4ff4-8d70-56bca7d26444', title: 'manifest.json' }, 'Browser tabs'],
    ['chrome:', { url: 'chrome://extensions/', title: 'chrome://extensions/' }, 'Browser tabs'],
    ['file:', { url: 'file:///C:/clean-the-mess/index.html', title: 'Test report' }, 'Opened files'],
    ['ftp:', { url: 'ftp://www.example.com/index.html', title: 'Test report' }, 'ftp://www.example.com'],
    ['localhost', { url: 'localhost', title: 'localhost' }, 'Localhost'],
    ['localhost:3000', { url: 'localhost:3000', title: 'localhost:3000' }, 'Localhost'],
    ['IP', { url: '127.0.0.1', title: 'IP address' }, '127.0.0.1'],
    ['IP:port', { url: '127.0.0.1:3000', title: 'IP address with port' }, '127.0.0.1'],
    // Failcases:
    ['random string', { url: 'random string', title: 'random string' }, 'Other tabs'],
    ['empty string', { url: '', title: '' }, 'Other tabs'],
  ])(
    'output should work fine with non-urls - %s',
    (_tcTitle, testData, expected) => {
      const { url, title } = testData;
      const sampleMinifiedTabs = [
        {
          id: 5,
          index: 0,
          windowId: 1,
          pinned: false,
          status: 'complete',
          lastAccessed: 1589322068712,
          url,
          title,
        },
      ];

      const output = getOverview(sampleMinifiedTabs);
      const item = output[0];

      expect(item.url).toBe(expected);
    },
  );
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
  ];

  const output = getOverview(sampleMinifiedTabs);

  expect(output.length).toBe(0);
});
