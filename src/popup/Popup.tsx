import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

import browser from 'webextension-polyfill';

import { OverviewScreen } from './screens/Overview';
import { DetailsScreen } from './screens/Details';
import { LatestScreen } from './screens/Latest';
import { SearchScreen } from './screens/Search';

import { useOverview, useTabs } from './hooks';

import { handlePopupListeners } from '../_modules';
import { Screen, ScreenName, Screens } from '../types';
import classNames from 'classnames';
import { isChrome } from './utils';

export type SwitchToScreenType = <T extends ScreenName>(next: T, options?: Screens[T]) => void;
export type CloseTabs = (ids?: number | number[]) => Promise<void>;

export default function Popup() {
  const [screen, setScreen] = useState<Screen>({ name: 'overview' });

  const { tabs, closeTabs, overview: rrr } = useTabs();
  const { overview } = useOverview(tabs);

  console.log(tabs);
  console.log(overview);
  console.log(rrr);

  const switchToScreen: SwitchToScreenType = useCallback((nextScreen, options) => {
    setScreen({ name: nextScreen, options: options });
  }, []);

  /** Listeners from background.js (bookmark all) */
  /** @todo replace any */
  useEffect(() => {
    const listenersCb = (message: any) => {
      handlePopupListeners({ message, closeCb: closeTabs, overviewData: overview });
    };

    browser.runtime.onMessage.addListener(listenersCb);

    return () => {
      // remove listener
      browser.runtime.onMessage.removeListener(listenersCb);
    };
  }, [overview, closeTabs]);

  const overviewScreen = useMemo(
    () => (
      <div
        id="overview"
        className={classNames('screen', 'slide-out', screen.name === 'overview' && 'slide-in-reverse')}
      >
        <OverviewScreen switchToScreen={switchToScreen} />
      </div>
    ),
    [screen.name, switchToScreen],
  );

  const detailsScreen = useMemo(
    () => (
      <div className={classNames('screen', 'screen-details', screen.name === 'details' && 'slide-in')}>
        <DetailsScreen screen={screen} switchToScreen={switchToScreen} isActive={screen.name === 'details'} />
      </div>
    ),
    [screen, switchToScreen],
  );

  const searchScreen = useMemo(
    () => (
      <div className={classNames('screen', 'screen-search', screen.name === 'search' && 'slide-in')}>
        <SearchScreen switchToScreen={switchToScreen} isActive={screen.name === 'search'} />
      </div>
    ),
    [screen.name, switchToScreen],
  );

  const latestScreen = useMemo(
    () => (
      <div className={classNames('screen', 'screen-latest', screen.name === 'latest' && 'slide-in')}>
        <LatestScreen switchToScreen={switchToScreen} closeTabs={closeTabs} />
      </div>
    ),
    [screen.name, switchToScreen, closeTabs],
  );

  return (
    <div className="body-container">
      {overviewScreen}
      {detailsScreen}
      {searchScreen}
      {!isChrome() && latestScreen}
    </div>
  );
}

ReactDOM.render(<Popup />, document.getElementById('main-container'));
