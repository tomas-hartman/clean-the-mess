import { VFC } from 'react';
import { useData } from '../../hooks/useData';
import { useFavicons } from '../../hooks';
import { OverviewHeader } from './OverviewHeader';
import { OverviewItem } from './OverviewItem';

export const OverviewScreen: VFC = () => {
  const { tabs, closeTabs, overview } = useData();

  const showFavicons = useFavicons();

  const items = overview.map((itemData, id) => {
    return (
      <OverviewItem itemId={id} data={itemData} key={itemData.key} closeTabs={closeTabs} showFavicon={showFavicons} />
    );
  });

  return (
    <>
      <OverviewHeader openTabs={tabs.length} />
      <div className="body-container">
        <ul id="list" className="temp_ul">
          {items}
        </ul>
      </div>
    </>
  );
};
