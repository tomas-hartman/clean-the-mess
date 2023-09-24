import { FC } from 'react';
import { getHeaderTitle } from '../../../_modules';
import { useData } from '../../hooks';
import { screenList } from '../Overview/OverviewScreen.css';
import { LatestHeader } from './LatestHeader';
import { LatestListItem } from '../../components';

/**
 * OldestTabs, longest inactive
 */
export const LatestScreen: FC = () => {
  const headerTitle = getHeaderTitle('_', 'latest', 10);

  const { latestTabs } = useData();

  return (
    <>
      <LatestHeader title={headerTitle} />
      <ul className={screenList}>
        {latestTabs.map(itemData => (
          <LatestListItem data={itemData} key={itemData.id} />
        ))}
      </ul>
    </>
  );
};
