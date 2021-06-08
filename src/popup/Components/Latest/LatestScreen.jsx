import React from 'react';
import { getHeaderTitle } from '../../../_modules';
import LatestHeader from './LatestHeader';
import DetailsItem from '../Details/DetailsItem';

/**
 * OldestTabs, longest inactive
 * @param {*} props
 * @returns
 */
export default function DetailsScreen(props) {
  const {
    detailsData, overviewData, className: extraClass, switchToScreen, closeTabs,
  } = props;
  const type = 'lastDisplayed';
  const headerTitle = getHeaderTitle(0, 'latest', 10);

  return (
    <div className={`screen screen-latest ${extraClass}`}>
      <LatestHeader
        overviewData={overviewData}
        title={headerTitle}
        switchToScreen={switchToScreen}
        closeTabs={closeTabs}
      />
      <div className="body-container">
        <ul>
          {detailsData.map((itemData, i) => (
            <DetailsItem
              itemId={i}
              data={itemData}
              type={type}
              key={itemData.id}
              closeTabs={closeTabs}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
