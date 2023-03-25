import { getHeaderTitle } from '../../../_modules';
import { LatestHeader } from './LatestHeader';
import { DetailsItem } from '../../components/DetailItem';
import { FC } from 'react';
import { useFavicons, useData } from '../../hooks';

/**
 * OldestTabs, longest inactive
 * @param {*} props
 * @returns
 */
export const LatestScreen: FC = () => {
  const type = 'lastDisplayed';
  const headerTitle = getHeaderTitle('_', 'latest', 10);

  const { latestTabs, closeTabs } = useData();
  const showFavicons = useFavicons();

  return (
    <>
      <LatestHeader title={headerTitle} />
      <div className="body-container">
        <ul className="temp_ul">
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
