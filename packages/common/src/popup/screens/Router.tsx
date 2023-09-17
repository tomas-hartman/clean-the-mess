import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import browser from 'webextension-polyfill';
import { CloseTabsInListenerArgs, handlePopupListeners } from '../../_modules';
import { useData } from '../hooks';
import {
  screen as screenStyle,
  overviewScreen as overviewScreenStyle,
  screenSlideOut,
  screenSlideIn,
  overviewSlideIn,
  overviewSlideOut,
} from './Router.css';
import { isFirefox } from '../utils';
import { DetailsScreen } from './Details';
import { LatestScreen } from './Latest';
import { OverviewScreen } from './Overview';
import { SearchScreen } from './Search';
import { useNavigate } from '../providers';

export const Router = () => {
  const { closeTabs: closeCb, overview: overviewData } = useData();
  const { screen } = useNavigate();

  /** Listeners from background.js (bookmark all) */
  useEffect(() => {
    const listenersCb = (message: CloseTabsInListenerArgs['message']) => {
      handlePopupListeners({ message, closeCb, overviewData });
    };

    browser.runtime.onMessage.addListener(listenersCb);

    return () => {
      // remove listener
      browser.runtime.onMessage.removeListener(listenersCb);
    };
  }, [overviewData, closeCb]);

  const overviewScreen = useMemo(
    () => (
      <div className={clsx(overviewScreenStyle, overviewSlideOut, screen.name === 'overview' && overviewSlideIn)}>
        <OverviewScreen />
      </div>
    ),
    [screen.name],
  );

  const detailsScreen = useMemo(
    () => (
      <div className={clsx(screenStyle, screenSlideOut, screen.name === 'details' && screenSlideIn)}>
        <DetailsScreen screen={screen} isActive={screen.name === 'details'} />
      </div>
    ),
    [screen],
  );

  const searchScreen = useMemo(
    () => (
      <div className={clsx(screenStyle, screenSlideOut, screen.name === 'search' && screenSlideIn)}>
        <SearchScreen isActive={screen.name === 'search'} />
      </div>
    ),
    [screen.name],
  );

  const latestScreen = useMemo(
    () => (
      <div className={clsx(screenStyle, screenSlideOut, screen.name === 'latest' && screenSlideIn)}>
        <LatestScreen />
      </div>
    ),
    [screen.name],
  );

  return (
    <>
      {overviewScreen}
      {detailsScreen}
      {searchScreen}
      {isFirefox() && latestScreen}
    </>
  );
};
