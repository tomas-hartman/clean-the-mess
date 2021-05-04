import React from 'react';
import { DetailsHeader } from './DetailsHeader';
import { DetailsItem } from './DetailsItem';

export default function DetailsScreen({data: tabsData, className: extraClass}) {
  const type = 'url';

  return (
    <div id="details" className={`screen ${extraClass}`}>
      <DetailsHeader />
      <div className="body-container">
        <ul>
          {
            tabsData.map((itemData, i) => {
              return <DetailsItem itemId={i} data={itemData} type={type} key={itemData.id} />;
            })
          }
        </ul>
      </div>
    </div>
  );
}