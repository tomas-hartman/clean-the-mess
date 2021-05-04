import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import sampleOverviewData from '../dev/search-dev/overview-data';
import sampleTabsData from '../dev/search-dev/input-data';

import OverviewScreen from './Components/Overview';
import DetailsScreen from './Components/Details/';

export default function Popup() {
  const [screen, setScreen] = useState();
  const [overviewData, setOverviewData] = useState(sampleOverviewData);
  const [tabsData, setTabsData] = useState(sampleTabsData);

  return (
    <div className="body-container">
      {/* <OverviewScreen data={overviewData} /> */}
      <DetailsScreen data={tabsData} className='slide-in'/>
    </div>
  );
}

ReactDOM.render(<Popup />, document.getElementById('main-container'));