import { FC } from 'react';
import { getHeaderTitle } from '../../../_modules';
import { DetailsItem } from '../../components/DetailItem';
import { useData, useFavicons } from '../../hooks';
import { screenList } from '../Overview/OverviewScreen.css';
import { LatestHeader } from './LatestHeader';

/**
 * OldestTabs, longest inactive
 */
export const LatestScreen: FC = () => {
  const type = 'lastDisplayed';
  const headerTitle = getHeaderTitle('_', 'latest', 10);

  const { latestTabs, closeTabs } = useData();
  const showFavicons = useFavicons();

  return (
    <>
      <LatestHeader title={headerTitle} />
      <ul className={screenList}>
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
    </>
  );
};
