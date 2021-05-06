import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import OverviewScreen from './Components/Overview';
import DetailsScreen from './Components/Details';
import SearchScreen from './Components/Search/SearchScreen';
import getOverview from '../modules/overview';

export default function Popup() {
  const [screen, setScreen] = useState({ name: 'overview' });
  const [overviewData, setOverviewData] = useState([]);
  const [tabsData, setTabsData] = useState([]);
  // const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      const tabsDataVar = await browser.tabs.query({ currentWindow: true });
      const overviewDataVar = getOverview(tabsDataVar);

      setOverviewData(overviewDataVar);
      setTabsData(tabsDataVar);
    })();
  }, []);

  const switchToScreen = (nextScreen, options = {}) => {
    setScreen({ name: nextScreen, options });
  };

  /**
   * Function that returns filtered array with details for given group
   * @param {Object} overviewItemData data of one given item in overviewData
   * @param {Object} innerTabsData tabsData object
   * @returns {Object[]}
   */
  const getDetailsData = (_screen, _tabsData) => {
    if (!_screen?.options?.ids) return [];

    const { ids } = _screen?.options;
    const array = [];

    for (let i = 0; i < ids.length; i++) {
      array.push(..._tabsData.filter((tab) => tab.id === ids[i]));
    }

    array.sort((a, b) => b.lastAccessed - a.lastAccessed);

    return array;
  };

  return (
    <div className="body-container">
      <OverviewScreen
        overviewData={overviewData}
        headerData={{ openTabs: tabsData.length }}
        className={screen.name === 'overview' ? 'slide-in-reverse' : ''}
        switchToScreen={switchToScreen}
      />
      <DetailsScreen
        detailsData={getDetailsData(screen, tabsData)}
        overviewData={screen.options}
        className={screen.name === 'details' ? 'slide-in' : ''}
        switchToScreen={switchToScreen}
      />
      <SearchScreen
        tabsData={tabsData}
        className={screen.name === 'search' ? 'slide-in' : ''}
        switchToScreen={switchToScreen}
      />
    </div>
  );
}

ReactDOM.render(<Popup />, document.getElementById('main-container'));
