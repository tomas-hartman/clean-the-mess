import React from 'react';
import DetailsItem from '../Details/DetailsItem';
import SearchHeader from './SearchHeader';

export default function SearchScreen(props) {
  const { tabsData, className: extraClass, switchToScreen } = props;
  const type = 'lastDisplayed';

  return (
    <div className={`screen screen-search ${extraClass}`}>

      <SearchHeader oKey={1} switchToScreen={switchToScreen} />

      <div className="body-container">
        <ul>
          {tabsData.map((item, i) => (
            <DetailsItem itemId={i} data={tabsData[i]} type={type} key={tabsData.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
