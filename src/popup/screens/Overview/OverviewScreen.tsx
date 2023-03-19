import { useEffect, VFC } from 'react';
import { useFavicons, useOverview, useTabs } from '../../hooks';
import { SwitchToScreenType } from '../../Popup';
import { OverviewHeader } from './OverviewHeader';
import { OverviewItem } from './OverviewItem';

interface OverviewScreenProps {
  switchToScreen: SwitchToScreenType;
}

export const OverviewScreen: VFC<OverviewScreenProps> = ({ switchToScreen }) => {
  const { tabs, closeTabs } = useTabs();
  const { overview } = useOverview();

  const showFavicons = useFavicons();

  const items = overview.map((itemData, id) => {
    return (
      <OverviewItem
        itemId={id}
        data={itemData}
        key={itemData.key}
        switchToScreen={switchToScreen}
        closeTabs={closeTabs}
        showFavicon={showFavicons}
      />
    );
  });

  return (
    <>
      <OverviewHeader switchToScreen={switchToScreen} openTabs={tabs.length} />
      <div className="body-container">
        <ul id="list">{items}</ul>
      </div>
    </>
  );
};
