import { VFC } from 'react';
import { useFavicons } from '../../hooks';
import { useData } from '../../hooks/useData';
import { OverviewHeader } from './OverviewHeader';
import { OverviewItem } from './OverviewItem';
import { screenList } from './OverviewScreen.css';

export const OverviewScreen: VFC = () => {
  const { tabs, closeTabs, overview } = useData();

  const showFavicons = useFavicons();

  return (
    <>
      <OverviewHeader openTabs={tabs.length} />
      <div className={screenList}>
        <ul id="list">
          {overview.map((itemData, id) => (
            <OverviewItem
              itemId={id}
              data={itemData}
              key={itemData.key}
              closeTabs={closeTabs}
              showFavicon={showFavicons}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
