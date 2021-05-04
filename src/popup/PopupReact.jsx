import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import OverviewScreen from './components/OverviewScreen';

export default function Popup() {
  const [screen, setScreen] = useState();
  const [overviewData, setOverviewData] = useState();
  const [tabsData, setTabsData] = useState();

  return (
    <div className="body-container">
      <OverviewScreen />
    </div>
  );
}

ReactDOM.render(<Popup />, document.getElementById('main-container'));