import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import OverviewScreen from './Components/Overview';
import DetailsScreen from './Components/Details';
import LatestScreen from './Components/Latest';
import SearchScreen from './Components/Search/SearchScreen';
import getOverview from '../modules/overview';
import { getLatestUsed } from '../modules/details';

export default function Popup() {
  const [screen, setScreen] = useState({ name: 'overview' });
  const [overviewData, setOverviewData] = useState([]);
  const [tabsData, setTabsData] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    (async () => {
      if (refresh) {
        const tabsDataVar = await browser.tabs.query({ currentWindow: true });
        const overviewDataVar = getOverview(tabsDataVar);

        setOverviewData(overviewDataVar);
        setTabsData(tabsDataVar);
        setRefresh(false);
      }
    })();
  }, [refresh]);

  const switchToScreen = (nextScreen, options = {}) => {
    setScreen({ name: nextScreen, options });
  };

  const forceRefresh = () => {
    setRefresh(true);
  };

  const closeTabs = async (ids) => {
    await browser.tabs.remove(ids);
    forceRefresh();
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

    for (let i = 0; i < ids.length; i += 1) {
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
        closeTabs={closeTabs}
      />
      <DetailsScreen
        detailsData={getDetailsData(screen, tabsData)}
        overviewData={screen.options}
        className={screen.name === 'details' ? 'slide-in' : ''}
        switchToScreen={switchToScreen}
        closeTabs={closeTabs}
        isActive={screen.name === 'details'}
      />
      <SearchScreen
        tabsData={tabsData}
        className={screen.name === 'search' ? 'slide-in' : ''}
        switchToScreen={switchToScreen}
      />
      <LatestScreen
        detailsData={getLatestUsed(tabsData, 10)}
        overviewData={screen.options}
        className={screen.name === 'latest' ? 'slide-in' : ''}
        switchToScreen={switchToScreen}
        closeTabs={closeTabs}
      />
    </div>
  );
}

ReactDOM.render(<Popup />, document.getElementById('main-container'));
