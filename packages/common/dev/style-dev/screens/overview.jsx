import ReactDOM from 'react-dom';

// import '../style.scss';

import { OverviewScreen } from '../../../src/popup/screens/Overview/OverviewScreen';
import { getOverview } from '../../../src/_modules';
import { tabs } from '../samples/firefox/tabs';

const tabsOverview = getOverview(tabs);

ReactDOM.render(
  <OverviewScreen
    overviewData={tabsOverview}
    headerData={{ openTabs: 10 }}
    className="slide-in"
    switchToScreen={() => true}
    closeTabs={() => true}
  />,
  document.getElementsByClassName('dev-wrapper-overview')[0],
);
