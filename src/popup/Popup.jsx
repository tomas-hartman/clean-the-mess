import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import browser from 'webextension-polyfill';

import OverviewScreen from './Components/Overview';
import DetailsScreen from './Components/Details';
import LatestScreen from './Components/Latest';
import SearchScreen from './Components/Search/SearchScreen';

import {
  getOverview, getDetailsData, getLatestUsed, handlePopupListeners,
} from '../_modules';

export default function Popup() {
  const [screen, setScreen] = useState({ name: 'overview' });
  const [overviewData, setOverviewData] = useState([]);
  const [tabsData, setTabsData] = useState([]);
  const [refresh, setRefresh] = useState(true);

  /** Load & prepare tabs & overview data */
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

  const forceRefresh = () => setRefresh(true);

  const switchToScreen = (nextScreen, options = {}) => {
    setScreen({ name: nextScreen, options });
  };

  const closeTabs = async (ids) => {
    await browser.tabs.remove(ids);
    forceRefresh();
  };

  /** Listeners from background.js (bookmark all) */
  useEffect(() => {
    const listenersCb = (message) => {
      handlePopupListeners({ message, closeCb: closeTabs, overviewData });
    };

    browser.runtime.onMessage.addListener(listenersCb);

    return () => {
      // remove listener
      browser.runtime.onMessage.removeListener(listenersCb);
    };
  }, [overviewData]);

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
        overviewData={overviewData?.find((item) => item.key === screen?.options?.key)}
        className={screen.name === 'details' ? 'slide-in' : ''}
        switchToScreen={switchToScreen}
        closeTabs={closeTabs}
        isActive={screen.name === 'details'}
      />
      <SearchScreen
        tabsData={tabsData}
        className={screen.name === 'search' ? 'slide-in' : ''}
        switchToScreen={switchToScreen}
        closeTabs={closeTabs}
        isActive={screen.name === 'search'}
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
