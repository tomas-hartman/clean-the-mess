import React from 'react';
import DetailsItem from '../Details/DetailsItem';
import SearchHeader from './SearchHeader';

export default function SearchScreen(props) {
  const { data: tabsData, className: extraClass, switchToScreen } = props;
  const type = 'lastDisplayed';

  return (
    <div id="search" className={`screen slide-out-reverse ${extraClass}`}>

      <SearchHeader switchToScreen={switchToScreen} />

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
