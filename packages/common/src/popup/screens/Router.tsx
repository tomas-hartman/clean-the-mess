import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import browser from 'webextension-polyfill';
import { CloseTabsInListenerArgs, handlePopupListeners } from '../../_modules';
import { useData } from '../hooks';
import { overviewScreen as overviewScreenStyle, overviewSlideIn, overviewSlideOut } from './Router.css';
import { isFirefox } from '../utils';
import { DetailsScreen } from './Details';
import { LatestScreen } from './Latest';
import { OverviewScreen } from './Overview';
import { SearchScreen } from './Search';
import { useNavigate } from '../providers';
import { SCREEN } from '../types';
import { Screen } from './Screen';
import { DuplicatesScreen } from './Duplicates';

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
      <div className={clsx(overviewScreenStyle, overviewSlideOut, screen.name === SCREEN.OVERVIEW && overviewSlideIn)}>
        <OverviewScreen />
      </div>
    ),
    [screen.name],
  );

  const detailsScreen = useMemo(
    () => (
      <Screen screenName={SCREEN.DETAILS}>
        <DetailsScreen screen={screen} isActive={screen.name === SCREEN.DETAILS} />
      </Screen>
    ),
    [screen],
  );

  const searchScreen = useMemo(
    () => (
      <Screen screenName={SCREEN.SEARCH}>
        <SearchScreen isActive={screen.name === SCREEN.SEARCH} />
      </Screen>
    ),
    [screen.name],
  );

  const latestScreen = useMemo(
    () => (
      <Screen screenName={SCREEN.LATEST}>
        <LatestScreen />
      </Screen>
    ),
    [],
  );

  const duplicatesScreen = useMemo(
    () => (
      <Screen screenName={SCREEN.DUPLICATES}>
        <DuplicatesScreen />
      </Screen>
    ),
    [],
  );

  return (
    <>
      {overviewScreen}
      {detailsScreen}
      {searchScreen}
      {duplicatesScreen}
      {isFirefox() && latestScreen}
    </>
  );
};
