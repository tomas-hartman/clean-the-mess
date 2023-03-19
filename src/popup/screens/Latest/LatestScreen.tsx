import { getHeaderTitle } from '../../../_modules';
import { LatestHeader } from './LatestHeader';
import { DetailsItem } from '../../components/DetailItem';
import { FC } from 'react';
import { CloseTabs, SwitchToScreenType } from '../../Popup';
import { useFavicons, useLatestTabs } from '../../hooks';

type LatestScreenProps = {
  switchToScreen: SwitchToScreenType;
  closeTabs: CloseTabs;
};

/**
 * OldestTabs, longest inactive
 * @param {*} props
 * @returns
 */
export const LatestScreen: FC<LatestScreenProps> = ({ switchToScreen, closeTabs }) => {
  const type = 'lastDisplayed';
  const headerTitle = getHeaderTitle('_', 'latest', 10);

  const { latestTabs } = useLatestTabs({ numOfLatest: 10 });
  const showFavicons = useFavicons();

  return (
    <>
      <LatestHeader title={headerTitle} switchToScreen={switchToScreen} />
      <div className="body-container">
        <ul>
          {latestTabs.map((itemData, i) => (
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
