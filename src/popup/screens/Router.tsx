import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import browser from 'webextension-polyfill';
import { handlePopupListeners } from '../../_modules';
import { useNavigate, useData } from '../hooks';
import {
  screen as screenStyle,
  overviewScreen as overviewScreenStyle,
  screenBodyContainer,
  screenSlideOut,
  screenSlideIn,
  overviewSlideIn,
  overviewSlideOut,
} from './Router.css';
import { isChrome } from '../utils';
import { DetailsScreen } from './Details';
import { LatestScreen } from './Latest';
import { OverviewScreen } from './Overview';
import { SearchScreen } from './Search';

export const Router = () => {
  const { closeTabs, overview } = useData();
  const { screen } = useNavigate();

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
    <div className={clsx(screenBodyContainer)}>
      {overviewScreen}
      {detailsScreen}
      {searchScreen}
      {!isChrome() && latestScreen}
    </div>
  );
};
