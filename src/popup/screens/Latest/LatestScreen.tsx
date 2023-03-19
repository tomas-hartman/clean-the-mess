import { getHeaderTitle } from '../../../_modules';
import { LatestHeader } from './LatestHeader';
import { DetailsItem } from '../../components/DetailItem';
import { FC } from 'react';
import { Tabs } from 'webextension-polyfill';
import { CloseTabs, SwitchToScreenType } from '../../Popup';

type LatestScreenProps = {
  detailsData: Tabs.Tab[],
  switchToScreen: SwitchToScreenType,
  closeTabs: CloseTabs,
  showFavicons: boolean
}

/**
 * OldestTabs, longest inactive
 * @param {*} props
 * @returns
 */
export const LatestScreen: FC<LatestScreenProps> = ({ detailsData, switchToScreen, closeTabs, showFavicons }) => {
  const type = 'lastDisplayed';
  const headerTitle = getHeaderTitle('_', 'latest', 10);

  return (
    <>
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
    </>
  );
};
