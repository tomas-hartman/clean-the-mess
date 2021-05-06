import React from 'react';
import { getHeaderTitle } from '../../../modules/helpers.refactor';
import DetailsHeader from './DetailsHeader';
import DetailsItem from './DetailsItem';

export default function DetailsScreen(props) {
  const {
    detailsData, overviewData, className: extraClass, switchToScreen,
  } = props;
  const type = 'url';
  const headerTitle = getHeaderTitle(overviewData?.url, 'details');
  const oKey = overviewData?.key;

  return (
    <div className={`screen screen-details ${extraClass}`}>
      <DetailsHeader oKey={oKey} title={headerTitle} switchToScreen={switchToScreen} />
      <div className="body-container">
        <ul>
          {detailsData.map((itemData, i) => (
            <DetailsItem itemId={i} data={itemData} type={type} key={itemData.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
