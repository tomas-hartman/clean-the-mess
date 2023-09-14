/** This mocks browser API and webextension-polyfill */

import { tabs } from '../../tests/__sampleData__/tabs';

const module = {
  browser: {},
  runtime: {
    onMessage: {
      addListener: () => {},
      removeListener: () => {},
    },
  },
  tabs: {
    query: () => tabs,
  },
  bookmarks: {
    search: () => true,
  },
};

export default module;
