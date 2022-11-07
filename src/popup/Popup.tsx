import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import browser, { Events, Tabs } from 'webextension-polyfill';

import OverviewScreen from './Components/Overview';
import DetailsScreen from './Components/Details';
import LatestScreen from './Components/Latest';
import SearchScreen from './Components/Search/SearchScreen';

import {
  getOverview, getDetailsData, getLatestUsed, handlePopupListeners,
} from '../_modules';
import { useFavicons } from './hooks/useFavicons';
import { Overview, OverviewItem, ScreenName, Screens } from '../types';

export default function Popup() {
  const [screen, setScreen] = useState<{name: ScreenName, options?: Screens[ScreenName]}>({ name: 'overview' });
  const [overviewData, setOverviewData] = useState<Overview>([]);
  const [tabsData, setTabsData] = useState<Tabs.Tab[]>([]);
  const [refresh, setRefresh] = useState(true);

  const showFavicons = useFavicons();

  const isChrome = process.env.BROWSER_NAME === 'chrome';

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

  type SwitchToScreenType = <T extends ScreenName>(next: T, options: Screens[T]) => void; 

  const switchToScreen: SwitchToScreenType = (nextScreen, options) => {
    setScreen({ name: nextScreen, options: options });
  };

  const closeTabs = async (ids: number | number[]) => {
    await browser.tabs.remove(ids);
    forceRefresh();
  };

  /** Listeners from background.js (bookmark all) */
  /** @todo replace any */
  useEffect(() => {
    const listenersCb = (message: any) => {
      handlePopupListeners({ message, closeCb: closeTabs, overviewData });
    };

    browser.runtime.onMessage.addListener(listenersCb);

    return () => {
      // remove listener
      browser.runtime.onMessage.removeListener(listenersCb);
    };
  }, [overviewData]);

  const overviewScreen = (
    <OverviewScreen
      overviewData={overviewData}
      headerData={{ openTabs: tabsData.length }}
      className={screen.name === 'overview' ? 'slide-in-reverse' : ''}
      switchToScreen={switchToScreen}
      closeTabs={closeTabs}
      showFavicons={showFavicons}
    />
  );

  const detailsScreen = (
    <DetailsScreen
      detailsData={getDetailsData(screen, tabsData)}
      overviewData={overviewData?.find((item) => item.key === screen?.options?.key)}
      className={screen.name === 'details' ? 'slide-in' : ''}
      switchToScreen={switchToScreen}
      closeTabs={closeTabs}
      isActive={screen.name === 'details'}
    />
  );

  const searchScreen = (
    <SearchScreen
      tabsData={tabsData}
      className={screen.name === 'search' ? 'slide-in' : ''}
      switchToScreen={switchToScreen}
      closeTabs={closeTabs}
      isActive={screen.name === 'search'}
      showFavicons={showFavicons}
    />
  );

  const latestScreen = (
    <LatestScreen
      detailsData={getLatestUsed(tabsData, 10)}
      overviewData={screen.options}
      className={screen.name === 'latest' ? 'slide-in' : ''}
      switchToScreen={switchToScreen}
      closeTabs={closeTabs}
      showFavicons={showFavicons}
    />
  );

  return (
    <div className="body-container">
      {overviewScreen}
      {detailsScreen}
      {searchScreen}
      {!isChrome && latestScreen}
    </div>
  );
}

ReactDOM.render(<Popup />, document.getElementById('main-container'));
