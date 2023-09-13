import React from 'react';
import ReactDOM from 'react-dom';

// import '../style.scss';

import LatestScreen from '../../../popup/screens/Latest';
import { getLatestUsed, getOverview } from '../../../_modules';
import { tabs } from '../samples/firefox/tabs';

const overviewData = getOverview(tabs);
const latestUsed = getLatestUsed(tabs, 10);
const closeTabs = () => true;
const switchToScreen = () => true;

ReactDOM.render(
  <LatestScreen
    detailsData={latestUsed}
    overviewData={overviewData}
    className="slide-in"
    switchToScreen={switchToScreen}
    closeTabs={closeTabs}
  />,
  document.getElementsByClassName('dev-wrapper-latest')[0],
);
