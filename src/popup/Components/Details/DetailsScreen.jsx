import React, { forwardRef, useEffect, useRef } from 'react';
import DetailsHeader from './DetailsHeader';
import DetailsItem from './DetailsItem';

export default function DetailsScreen(props) {
  const { data: tabsData, className: extraClass, switchToScreen } = props;
  const type = 'url';

  // useEffect(() => {
  //   console.log('ref', detailsRef);
  // }, [detailsRef]);

  return (
    <div id="details" className={`screen ${extraClass}`}>
      <DetailsHeader switchToScreen={switchToScreen} />
      <div className="body-container">
        <ul>
          {tabsData.map((itemData, i) => (
            <DetailsItem itemId={i} data={itemData} type={type} key={itemData.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
