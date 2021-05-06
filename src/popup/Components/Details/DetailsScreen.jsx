import React from 'react';
import DetailsHeader from './DetailsHeader';
import DetailsItem from './DetailsItem';

export default function DetailsScreen(props) {
  const { data: tabsData, className: extraClass, switchToScreen } = props;
  const type = 'url';

  return (
    <div id="details" className={`screen slide-out-reverse ${extraClass}`}>
      <DetailsHeader oid={1} title="www.npmjs.com" switchToScreen={switchToScreen} />
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
