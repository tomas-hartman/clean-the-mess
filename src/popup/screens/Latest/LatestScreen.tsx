import { getHeaderTitle } from '../../../_modules';
import { LatestHeader } from './LatestHeader';
import { DetailsItem } from '../../components/DetailItem';
import { FC } from 'react';
import { Tabs } from 'webextension-polyfill';
import { CloseTabs, SwitchToScreenType } from '../../Popup';

type LatestScreenProps = {
  detailsData: Tabs.Tab[],
  className: string, 
  switchToScreen: SwitchToScreenType,
  closeTabs: CloseTabs,
  showFavicons: boolean
}

/**
 * OldestTabs, longest inactive
 * @param {*} props
 * @returns
 */
export const DetailsScreen: FC<LatestScreenProps> = props => {
  const {
    detailsData, className: extraClass, switchToScreen, closeTabs, showFavicons,
  } = props;
  const type = 'lastDisplayed';
  const headerTitle = getHeaderTitle('_', 'latest', 10);

  return (
    <div className={`screen screen-latest ${extraClass}`}>
      <LatestHeader
        title={headerTitle}
        switchToScreen={switchToScreen}
      />
      <div className="body-container">
        <ul>
          {detailsData.map((itemData, i) => (
            <DetailsItem
              itemId={i}
              data={itemData}
              type={type}
              key={itemData.id}
              closeTabs={closeTabs}
              showFavicon={showFavicons}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
