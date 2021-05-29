import React, { useEffect } from 'react';
import { getHeaderTitle } from '../../../modules/helpers';
import DetailsHeader from './DetailsHeader';
import DetailsItem from './DetailsItem';

export default function DetailsScreen(props) {
  const {
    detailsData, overviewData, className: extraClass, switchToScreen, closeTabs, isActive,
  } = props;
  const type = 'url';
  const headerTitle = getHeaderTitle(overviewData?.url, 'details');

  useEffect(() => {
    if (isActive && detailsData.length === 0) {
      switchToScreen('overview');
    }
  }, [detailsData]);

  return (
    <div className={`screen screen-details ${extraClass}`}>
      <DetailsHeader
        title={headerTitle}
        overviewData={overviewData}
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
