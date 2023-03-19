import { VFC, useEffect } from 'react';
import { Tabs } from 'webextension-polyfill';
import { OverviewItem } from '../../../types';
import { getHeaderTitle } from '../../../_modules';
import { CloseTabs, SwitchToScreenType } from '../../Popup';
import { DetailsHeader } from './DetailsHeader';
import { DetailsItem } from '../../components/DetailItem';

interface DetailsScreenProps {
  detailsData: Tabs.Tab[],
  overviewData?: OverviewItem,
  switchToScreen: SwitchToScreenType,
  closeTabs: CloseTabs,
  isActive: boolean,
}

export const DetailsScreen: VFC<DetailsScreenProps> = ({ 
  detailsData, 
  overviewData, 
  switchToScreen, 
  closeTabs, 
  isActive 
}) => {
  const type = 'url';
  const headerTitle = getHeaderTitle(overviewData?.url, 'details');

  useEffect(() => {
    if (isActive && detailsData.length === 0) {
      switchToScreen('overview');
    }
  }, [detailsData]);

  return (
    <>
      <DetailsHeader
        title={headerTitle}
        overviewData={overviewData}
        switchToScreen={switchToScreen}
        closeTabs={closeTabs}
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
            />
          ))}
        </ul>
      </div>
    </>
  );
};
