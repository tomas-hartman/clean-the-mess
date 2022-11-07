import React from 'react';
import ReactDOM from 'react-dom';

// import '../style.scss';

import { DetailsScreen } from '../../../popup/Components/Details/DetailsScreen';
import { getOverview } from '../../../_modules';
import { tabs } from '../samples/firefox/tabs';

const tabsOverview = getOverview(tabs);
// const detailsData = getDetailsData(screen, tabsData);
const closeTabs = () => true;
const switchToScreen = () => true;

ReactDOM.render(
  <DetailsScreen
    detailsData={tabs}
    overviewData={tabsOverview[0]}
    className="slide-in"
    switchToScreen={switchToScreen}
    closeTabs={closeTabs}
    isActive
  />,
  document.getElementsByClassName('dev-wrapper-details')[0],
);
