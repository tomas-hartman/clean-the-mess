import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import sampleOverviewData from '../dev/search-dev/overview-data';
import sampleTabsData from '../dev/search-dev/input-data';

import OverviewScreen from './Components/Overview';
import DetailsScreen from './Components/Details';
import SearchScreen from './Components/Search/SearchScreen';

export default function Popup() {
  const [screen, setScreen] = useState('overview');
  const [overviewData, setOverviewData] = useState(sampleOverviewData);
  const [tabsData, setTabsData] = useState(sampleTabsData);

  const switchToScreen = (nextScreen) => {
    setScreen(nextScreen);
  };

  return (
    <div className="body-container">
      <OverviewScreen
        data={overviewData}
        className={screen === 'overview' ? 'slide-in-reverse' : ''}
        switchToScreen={switchToScreen}
      />
      <DetailsScreen
        data={tabsData}
        // Animation works one way, slide-in -> slide-out-reverse, not the other. Why?
        className={screen === 'details' ? 'slide-in' : ''}
        switchToScreen={switchToScreen}
      />
      <SearchScreen
        data={tabsData}
        className={screen === 'search' ? 'slide-in' : ''}
        switchToScreen={switchToScreen}
      />
    </div>
  );
}

ReactDOM.render(<Popup />, document.getElementById('main-container'));
