import { VFC } from 'react';
import { Overview } from '../../../types';
import { CloseTabs, SwitchToScreenType } from '../../Popup';
import { OverviewHeader } from './OverviewHeader';
import { OverviewItem } from './OverviewItem';

interface HeaderData {
  /** Number of open tabs */
  openTabs: number
}

interface OverviewScreenProps {
  className: string,
  overviewData: Overview,
  headerData: HeaderData,
  switchToScreen: SwitchToScreenType,
  closeTabs: CloseTabs,
  showFavicons: boolean,
}

export const OverviewScreen: VFC<OverviewScreenProps> = (props) => {
  const {
    className: extraClass,
    overviewData,
    headerData,
    switchToScreen,
    closeTabs,
    showFavicons,
  } = props;
  const { openTabs } = headerData;

  return (
    <div id="overview" className={`screen slide-out ${extraClass}`}>
      <OverviewHeader switchToScreen={switchToScreen} openTabs={openTabs} />
      <div className="body-container">
        <ul id="list">
          {overviewData.map((itemData, id) => {
            return (
              <OverviewItem
                itemId={id}
                data={itemData}
                key={itemData.key}
                switchToScreen={switchToScreen}
                closeTabs={closeTabs}
                showFavicon={showFavicons}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
