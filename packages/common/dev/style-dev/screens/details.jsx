import ReactDOM from 'react-dom';

// import '../style.scss';

import { DetailsScreen } from '../../../src/popup/screens/Details/DetailsScreen';
import { getOverview } from '../../../src/_modules';
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
