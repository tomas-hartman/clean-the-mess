import { FC } from 'react';
import { getHeaderTitle } from '../../../_modules';
import { useData, useFavicons } from '../../hooks';
import { screenList } from '../Overview/OverviewScreen.css';
import { LatestHeader } from './LatestHeader';
import { LatestListItem } from '../../components';

/**
 * OldestTabs, longest inactive
 */
export const LatestScreen: FC = () => {
  const headerTitle = getHeaderTitle('_', 'latest', 10);
  const showFavicon = useFavicons();

  const { latestTabs } = useData();

  return (
    <>
      <LatestHeader title={headerTitle} />
      <ul className={screenList}>
        {latestTabs.map(itemData => (
          <LatestListItem data={itemData} key={itemData.id} showFavicon={showFavicon} />
        ))}
      </ul>
    </>
  );
};
