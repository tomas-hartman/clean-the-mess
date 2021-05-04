import React from 'react';
import sampleOverview from '../../../dev/search-dev/overview-data';
import { OverviewHeader } from './OverviewHeader';
import { OverviewItem } from './OverviewItem';

export function Separator() {
  return (
    <div className="separator separator-bottom" />
  );
}

export default function OverviewScreen({className: extraClass, data: overviewData}) {
  return (
    <div id="overview" className={`screen ${extraClass}`}>
      <OverviewHeader />
      <div className="body-container">
        <ul id="list">
          {
            overviewData.map((itemData, id) => {
              return <OverviewItem itemId={id} data={itemData} key={itemData.id} />;
            })
          }
        </ul>
      </div>
    </div>
  );
}
