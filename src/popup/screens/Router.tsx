import { useEffect, useMemo } from 'react';
import browser from 'webextension-polyfill';
import { OverviewScreen } from './Overview';
import { DetailsScreen } from './Details';
import { LatestScreen } from './Latest';
import { SearchScreen } from './Search';
import { handlePopupListeners } from '../../_modules';
import classNames from 'classnames';
import { isChrome } from '../utils';
import { useData } from '../hooks/useData';
import { useNavigate } from '../hooks';

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
      <div
        id="overview"
        className={classNames('screen', 'slide-out', screen.name === 'overview' && 'slide-in-reverse')}
      >
        <OverviewScreen />
      </div>
    ),
    [screen.name],
  );

  const detailsScreen = useMemo(
    () => (
      <div className={classNames('screen', 'screen-details', screen.name === 'details' && 'slide-in')}>
        <DetailsScreen screen={screen} isActive={screen.name === 'details'} />
      </div>
    ),
    [screen],
  );

  const searchScreen = useMemo(
    () => (
      <div className={classNames('screen', 'screen-search', screen.name === 'search' && 'slide-in')}>
        <SearchScreen isActive={screen.name === 'search'} />
      </div>
    ),
    [screen.name],
  );

  const latestScreen = useMemo(
    () => (
      <div className={classNames('screen', 'screen-latest', screen.name === 'latest' && 'slide-in')}>
        <LatestScreen />
      </div>
    ),
    [screen.name],
  );

  return (
    <div className="body-container">
      {overviewScreen}
      {detailsScreen}
      {searchScreen}
      {!isChrome() && latestScreen}
    </div>
  );
};
