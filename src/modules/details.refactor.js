/**
 * Function that returns filtered array with details for given group
 * @param {Object} _screen data passed to the screen
 * @param {Object} _tabsData tabsData object
 * @returns {Object[]}
 */
const getDetailsData = (_screen, _tabsData) => {
  if (!_screen?.options?.ids) return [];

  const { ids } = _screen?.options;
  const array = [];

  for (let i = 0; i < ids.length; i += 1) {
    array.push(..._tabsData.filter((tab) => tab.id === ids[i]));
  }

  array.sort((a, b) => b.lastAccessed - a.lastAccessed);

  return array;
};

export {
  getDetailsData,
};
