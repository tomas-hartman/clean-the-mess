import { tabs as testChTabs } from './chtabs.mjs';
import { tabs as testFfTabs } from './fftabs.mjs';
import { tabs as testTabs } from './devtabs.mjs';

export const getHash = value => {
  let hash = 0;
  let i;
  let chr;
  for (i = 0; i < value.length; i += 1) {
    chr = value.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return `${hash}`;
};

// NEEDS TO BE MOCKED TO BE RUN IN node

// UTILS START
const getOriginUrl = tabData => {
  if (!tabData.url) return 'Other tabs';

  const url = new URL(tabData.url);

  if (!(url.protocol === 'http:' || url.protocol === 'https:')) {
    switch (url.protocol) {
      case 'about:':
      case 'moz-extension:':
      case 'chrome:':
        return 'Browser tabs';
      case 'file:':
        return 'Opened files';
      default:
        return 'Other tabs';
    }
  }

  if (url.hostname === 'localhost') {
    return 'Localhost';
  }

  if (url.origin) {
    return url.origin;
  }

  return 'Other tabs';
};

const hasId = value => 'id' in value && value['id'] !== undefined;
// UTILS END

export const getOverview = tabs => {
  const output = [];
  const pinnedIds = [];

  tabs.forEach(tab => {
    const originUrl = getOriginUrl(tab);

    if (!hasId(tab)) {
      return;
    }

    if (tab.pinned) {
      pinnedIds.push(tab.id);
      return;
    }

    if (output.some(website => website.url === originUrl)) {
      const index = output.findIndex(website => website.url === originUrl);

      output[index].ids.push(tab.id);
    } else {
      const key = getHash(originUrl);

      output.push({
        url: originUrl,
        ids: [tab.id],
        key,
        favicon: tab.favIconUrl,
      });
    }
  });

  output.sort((a, b) => b.ids.length - a.ids.length);

  return {
    pinned:
      pinnedIds.length > 0
        ? {
            url: 'Pinned tabs',
            ids: pinnedIds,
            key: getHash('Pinned tabs'),
            favicon: undefined,
          }
        : null,
    overview: output,
  };
};

const getOverview2 = tabs => {
  const overviewMap = new Map();
  const pinnedIdsSet = new Set();

  tabs.forEach(tab => {
    if (!tab.id) return;

    const groupName = getOriginUrl(tab);

    if (tab.pinned) {
      pinnedIdsSet.add(tab.id);
      return;
    }

    if (overviewMap.has(groupName)) {
      const prev = overviewMap.get(groupName);

      if (!prev) return;

      overviewMap.set(groupName, {
        ...prev,
        ids: [...prev.ids, tab.id],
      });
      return;
    }

    const key = getHash(groupName);

    overviewMap.set(groupName, {
      key,
      url: groupName,
      favicon: tab.favIconUrl,
      ids: [tab.id],
    });
  });

  const pinnedGroup = {
    url: 'Pinned tabs',
    ids: Array.from(pinnedIdsSet),
    key: getHash('Pinned tabs'),
    favicon: undefined,
  };

  const overviewGroup = Array.from(overviewMap.values()).sort((a, b) => b.ids.length - a.ids.length);

  return {
    pinned: pinnedIdsSet.size > 0 ? pinnedGroup : null,
    overviewGroup,
  };
};

const getOverview2a = tabs => {
  const overviewMap = new Map();
  const pinnedIdsSet = new Set();

  tabs.forEach(tab => {
    if (!tab.id) return;

    const groupName = getOriginUrl(tab);

    if (tab.pinned) {
      pinnedIdsSet.add(tab.id);
      return;
    }

    if (overviewMap.has(groupName)) {
      const prev = overviewMap.get(groupName);

      if (!prev) return;

      prev.ids.push(tab.id);
      overviewMap.set(groupName, prev);
      return;
    }

    const key = getHash(groupName);

    overviewMap.set(groupName, {
      key,
      url: groupName,
      favicon: tab.favIconUrl,
      ids: [tab.id],
    });
  });

  const pinnedGroup = {
    url: 'Pinned tabs',
    ids: Array.from(pinnedIdsSet),
    key: getHash('Pinned tabs'),
    favicon: undefined,
  };

  const overviewGroup = Array.from(overviewMap.values()).sort((a, b) => b.ids.length - a.ids.length);

  return {
    pinned: pinnedIdsSet.size > 0 ? pinnedGroup : null,
    overviewGroup,
  };
};

export const getOverview3 = tabs => {
  const overviewMap = new Map();
  const pinnedIdsSet = new Set();

  for (let i = 0; i < tabs.length; i++) {
    const tab = tabs[i];

    if (!tab.id) continue;

    const groupName = getOriginUrl(tab);

    if (tab.pinned) {
      pinnedIdsSet.add(tab.id);
      continue;
    }

    if (overviewMap.has(groupName)) {
      const prev = overviewMap.get(groupName);

      if (!prev) continue;

      overviewMap.set(groupName, {
        ...prev,
        ids: [...prev.ids, tab.id],
      });
      continue;
    }

    const key = getHash(groupName);

    overviewMap.set(groupName, {
      key,
      url: groupName,
      favicon: tab.favIconUrl,
      ids: [tab.id],
    });
  }

  const pinnedGroup = {
    url: 'Pinned tabs',
    count: 0,
    ids: Array.from(pinnedIdsSet),
    key: getHash('Pinned tabs'),
    favicon: undefined,
  };

  const overviewGroup = Array.from(overviewMap.values()).sort((a, b) => b.ids.length - a.ids.length);

  return {
    pinned: pinnedIdsSet.size > 0 ? pinnedGroup : null,
    overviewGroup,
  };
};

export const getOverview3a = tabs => {
  const overviewMap = new Map();
  const pinnedIdsSet = new Set();

  for (let i = 0; i < tabs.length; i++) {
    const tab = tabs[i];

    if (!tab.id) continue;

    const groupName = getOriginUrl(tab);

    if (tab.pinned) {
      pinnedIdsSet.add(tab.id);
      continue;
    }

    if (overviewMap.has(groupName)) {
      const prev = overviewMap.get(groupName);

      if (!prev) continue;

      prev.ids.push(tab.id);
      overviewMap.set(groupName, prev);
      continue;
    }

    const key = getHash(groupName);

    overviewMap.set(groupName, {
      key,
      url: groupName,
      favicon: tab.favIconUrl,
      ids: [tab.id],
    });
    continue;
  }

  const pinnedGroup = {
    url: 'Pinned tabs',
    count: 0,
    ids: Array.from(pinnedIdsSet),
    key: getHash('Pinned tabs'),
    favicon: undefined,
  };

  const overviewGroup = Array.from(overviewMap.values()).sort((a, b) => b.ids.length - a.ids.length);

  return {
    pinned: pinnedIdsSet.size > 0 ? pinnedGroup : null,
    overviewGroup,
  };
};

export const getOverview4 = tabs => {
  const overviewMap = new Map();
  const pinnedIdsSet = new Set();

  for (const tab of tabs) {
    if (!tab.id) continue;

    const groupName = getOriginUrl(tab);

    if (tab.pinned) {
      pinnedIdsSet.add(tab.id);
      continue;
    }

    if (overviewMap.has(groupName)) {
      const prev = overviewMap.get(groupName);

      if (!prev) continue;

      overviewMap.set(groupName, {
        ...prev,
        ids: [...prev.ids, tab.id],
      });
      continue;
    }

    const key = getHash(groupName);

    overviewMap.set(groupName, {
      key,
      url: groupName,
      favicon: tab.favIconUrl,
      ids: [tab.id],
    });
  }

  const pinnedGroup = {
    url: 'Pinned tabs',
    count: 0,
    ids: Array.from(pinnedIdsSet),
    key: getHash('Pinned tabs'),
    favicon: undefined,
  };

  const overviewGroup = Array.from(overviewMap.values()).sort((a, b) => b.ids.length - a.ids.length);

  return {
    pinned: pinnedIdsSet.size > 0 ? pinnedGroup : null,
    overviewGroup,
  };
};

export const getOverview4a = tabs => {
  const overviewMap = new Map();
  const pinnedIdsSet = new Set();

  for (const tab of tabs) {
    if (!tab.id) continue;

    const groupName = getOriginUrl(tab);

    if (tab.pinned) {
      pinnedIdsSet.add(tab.id);
      continue;
    }

    if (overviewMap.has(groupName)) {
      const prev = overviewMap.get(groupName);

      if (!prev) continue;

      prev.ids.push(tab.id);
      overviewMap.set(groupName, prev);
      continue;
    }

    const key = getHash(groupName);

    overviewMap.set(groupName, {
      key,
      url: groupName,
      favicon: tab.favIconUrl,
      ids: [tab.id],
    });
  }

  const pinnedGroup = {
    url: 'Pinned tabs',
    count: 0,
    ids: Array.from(pinnedIdsSet),
    key: getHash('Pinned tabs'),
    favicon: undefined,
  };

  const overviewGroup = Array.from(overviewMap.values()).sort((a, b) => b.ids.length - a.ids.length);

  return {
    pinned: pinnedIdsSet.size > 0 ? pinnedGroup : null,
    overviewGroup,
  };
};

// TEST DATA START
const testPackageBase = [
  ...testChTabs,
  ...testFfTabs,
  ...testTabs,
  ...testChTabs,
  ...testFfTabs,
  ...testTabs,
  ...testChTabs,
  ...testFfTabs,
  ...testChTabs,
  ...testFfTabs,
  ...testChTabs,
  ...testFfTabs,
  ...testChTabs,
  ...testFfTabs,
];

const testPackage = [
  ...testPackageBase,
  ...testPackageBase,
  ...testPackageBase,
  ...testPackageBase,
  ...testPackageBase,
  ...testPackageBase,
  ...testPackageBase,
  ...testPackageBase,
  ...testPackageBase,
  ...testPackageBase,
  ...testPackageBase,
  ...testPackageBase,
  ...testPackageBase,
  ...testPackageBase,
  ...testPackageBase,
  ...testPackageBase,
  ...testPackageBase,
  ...testPackageBase,
  ...testPackageBase,
  ...testPackageBase,
];
// TEST DATA END

console.log('Complete length of tabs:', testPackage.length);

const createTestRunner = fn => () => {
  const start = performance.now();
  fn(testPackage);
  const end = performance.now();

  const speed = end - start;

  return speed;
};

export const runTest1 = createTestRunner(getOverview);
export const runTest2 = createTestRunner(getOverview2);
export const runTest2a = createTestRunner(getOverview2a);
export const runTest3 = createTestRunner(getOverview3);
export const runTest3a = createTestRunner(getOverview3a);
export const runTest4 = createTestRunner(getOverview4);
export const runTest4a = createTestRunner(getOverview4a);

// TEST START
const results = [
  ['test1', runTest1()],
  ['test2', runTest2()],
  ['test2a', runTest2a()],
  ['test3', runTest3()],
  ['test3a', runTest3a()],
  ['test4', runTest4()],
  ['test4a', runTest4a()],
];

console.log(results);
// TEST END
