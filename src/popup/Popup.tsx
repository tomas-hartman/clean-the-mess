import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import browser, { Tabs } from 'webextension-polyfill';

import { OverviewScreen } from './screens/Overview';
import { DetailsScreen } from './screens/Details';
import { LatestScreen } from './screens/Latest';
import { SearchScreen } from './screens/Search';

import {
  getOverview, getDetailsData, getLatestUsed, handlePopupListeners,
} from '../_modules';
import { useFavicons } from './hooks/useFavicons';
import { Overview, Screen, ScreenName, Screens } from '../types';
import classNames from 'classnames';

export type SwitchToScreenType = <T extends ScreenName>(next: T, options?: Screens[T]) => void; 
export type CloseTabs = (ids?: number | number[]) => Promise<void>

export default function Popup() {
  const [screen, setScreen] = useState<Screen>({ name: 'overview' });
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

  const switchToScreen: SwitchToScreenType = (nextScreen, options) => {
    setScreen({ name: nextScreen, options: options });
  };

  const closeTabs = async (ids?: number | number[]) => {
    if(!ids) return;

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
    <div id="overview" className={classNames('screen', 'slide-out', screen.name === 'overview' && 'slide-in-reverse')}>
      <OverviewScreen
        overviewData={overviewData}
        headerData={{ openTabs: tabsData.length }}
        switchToScreen={switchToScreen}
        closeTabs={closeTabs}
        showFavicons={showFavicons}
      />
    </div>
  );

  const detailsScreen = (
    <div className={classNames('screen', 'screen-details', screen.name === 'details' && 'slide-in')}>
      <DetailsScreen
        detailsData={getDetailsData(screen, tabsData)}
        overviewData={overviewData?.find((item) => item.key === screen?.options?.key)}
        switchToScreen={switchToScreen}
        closeTabs={closeTabs}
        isActive={screen.name === 'details'}
      />
    </div>
  );

  const searchScreen = (
    <div className={classNames('screen', 'screen-search', screen.name === 'search' && 'slide-in')}>
      <SearchScreen
        tabsData={tabsData}
        switchToScreen={switchToScreen}
        closeTabs={closeTabs}
        isActive={screen.name === 'search'}
        showFavicons={showFavicons}
      />
    </div>
  );

  const latestScreen = (
    <div className={classNames('screen', 'screen-latest', screen.name === 'latest' && 'slide-in')}>
      <LatestScreen
        detailsData={getLatestUsed(tabsData, 10)}
        switchToScreen={switchToScreen}
        closeTabs={closeTabs}
        showFavicons={showFavicons}
      />
    </div>
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
