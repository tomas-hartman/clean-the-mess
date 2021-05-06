import React from 'react';
import OverviewHeader from './OverviewHeader';
import OverviewItem from './OverviewItem';

export default function OverviewScreen(props) {
  const { className: extraClass, data: overviewData, switchToScreen } = props;

  return (
    <div id="overview" className={`screen slide-out ${extraClass}`}>
      <OverviewHeader switchToScreen={switchToScreen} />
      <div className="body-container">
        <ul id="list">
          {overviewData.map((itemData, id) => (
            <OverviewItem
              itemId={id}
              data={itemData}
              key={itemData.id}
              switchToScreen={switchToScreen}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
