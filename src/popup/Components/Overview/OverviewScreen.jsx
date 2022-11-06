import React from 'react';
import OverviewHeader from './OverviewHeader';
import OverviewItem from './OverviewItem';

export default function OverviewScreen(props) {
  const {
    className: extraClass,
    overviewData,
    headerData,
    switchToScreen,
    closeTabs,
    showFavicons,
  } = props;
  const { openTabs } = headerData;

  return (
    <div id="overview" className={`screen slide-out ${extraClass}`}>
      <OverviewHeader switchToScreen={switchToScreen} openTabs={openTabs} />
      <div className="body-container">
        <ul id="list">
          {overviewData.map((itemData, id) => {
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
          })}
        </ul>
      </div>
    </div>
  );
}
