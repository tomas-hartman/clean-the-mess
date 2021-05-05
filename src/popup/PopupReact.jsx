import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import sampleOverviewData from '../dev/search-dev/overview-data';
import sampleTabsData from '../dev/search-dev/input-data';

import OverviewScreen from './Components/Overview';
import DetailsScreen from './Components/Details';

export default function Popup() {
  const [screen, setScreen] = useState('overview');
  const [overviewData, setOverviewData] = useState(sampleOverviewData);
  const [tabsData, setTabsData] = useState(sampleTabsData);

  const showScreen = (screenName, thisScreen) => {
    switch (screenName) {
      case 'overview':
        if (thisScreen === 'overview') return 'slide-in-reverse';
        // @todo: this condition is workaround that helps covering an ugly glitch
        // the glitch is caused by deleting slide-in class and replacing it
        // directly with slide-out. by default details screen is off screen!
        if (thisScreen !== 'overview') return 'slide-out-reverse';
        break;
      case 'details':
        if (thisScreen === 'details') return 'slide-in';
        if (thisScreen === 'overview') return 'slide-out';
        break;
      case 'latest':
        if (thisScreen === 'latest') return 'slide-in';
        if (thisScreen === 'overview') return 'slide-out';
        break;
      case 'search':
        if (thisScreen === 'search') return 'slide-in';
        if (thisScreen === 'overview') return 'slide-out';
        break;
      default:
        break;
    }
  };

  const switchToScreen = (nextScreen) => {
    setScreen(nextScreen);
  };

  return (
    <div className="body-container">
      <OverviewScreen data={overviewData} className={showScreen(screen, 'overview')} switchToScreen={switchToScreen} />
      <DetailsScreen data={tabsData} className={showScreen(screen, 'details')} switchToScreen={switchToScreen} />
    </div>
  );
}

ReactDOM.render(<Popup />, document.getElementById('main-container'));
