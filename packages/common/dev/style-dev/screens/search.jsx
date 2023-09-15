import React from 'react';
import ReactDOM from 'react-dom';

// import '../style.scss';

import SearchScreen from '../../../src/popup/screens/Search/SearchScreen';
// import { getOverview } from '../../../_modules';
import { tabs } from '../samples/firefox/tabs';

// const overviewData = getOverview(tabs);
// const detailsData = getDetailsData(screen, tabsData);
const closeTabs = () => true;
const switchToScreen = () => true;

ReactDOM.render(
  <SearchScreen
    tabsData={tabs}
    className="slide-in"
    switchToScreen={switchToScreen}
    closeTabs={closeTabs}
    isActive
  />,
  document.getElementsByClassName('dev-wrapper-search')[0],
);