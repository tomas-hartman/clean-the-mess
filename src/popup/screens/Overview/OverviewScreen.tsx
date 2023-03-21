import { VFC } from 'react';
import { useData } from '../../hooks/useData';
import { useFavicons } from '../../hooks';
import { SwitchToScreenType } from '../../Popup';
import { OverviewHeader } from './OverviewHeader';
import { OverviewItem } from './OverviewItem';

interface OverviewScreenProps {
  switchToScreen: SwitchToScreenType;
}

export const OverviewScreen: VFC<OverviewScreenProps> = ({ switchToScreen }) => {
  const { tabs, closeTabs, overview } = useData();

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
