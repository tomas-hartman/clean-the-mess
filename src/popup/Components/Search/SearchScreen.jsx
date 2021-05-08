import React, { useState } from 'react';
import search from '../../../modules/search';
import DetailsItem from '../Details/DetailsItem';
import SearchHeader from './SearchHeader';

export default function SearchScreen(props) {
  const {
    tabsData, className: extraClass, switchToScreen, isActive, closeTabs,
  } = props;
  const [foundTabsData, setFoundTabsData] = useState([]);
  const type = 'url';

  const searchError = (
    <li id="nothing-to-show">
      <div className="item-container error">
        Nothing to display. Either nothing was found or the search hasn&apos;t started yet.
      </div>
    </li>
  );

  const foundItems = foundTabsData.map((item, i) => (
    <DetailsItem itemId={i} data={item} type={type} key={item.id} />
  ));

  const performSearch = (ref) => {
    const { value } = ref.target ? ref.target : ref.current;

    // @todo debounce
    const result = search.perform(tabsData, value);

    setFoundTabsData(result);
  };

  return (
    <div className={`screen screen-search ${extraClass}`}>

      <SearchHeader
        oKey={1}
        switchToScreen={switchToScreen}
        foundTabsData={foundTabsData}
        tabsData={tabsData}
        performSearch={performSearch}
        closeTabs={closeTabs}
        isActive={isActive}
      />

      <div className="body-container">
        <ul>
          {foundTabsData.length > 1 ? foundItems : searchError}
        </ul>
      </div>
    </div>
  );
}
