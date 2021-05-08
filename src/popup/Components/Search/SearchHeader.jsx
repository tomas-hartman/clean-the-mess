import React, { useEffect, useRef } from 'react';
import { CloseAllHeaderBtn, GoBackBtn } from '../Buttons';
import Separator from '../Separator';

/**
 * @todo implement search functionality
 * @todo oid: which items should be deleted
 * @param {*} param0
 * @returns
 */
export default function SearchHeader(props) {
  const {
    switchToScreen, foundTabsData, performSearch, isActive, closeTabs, tabsData,
  } = props;
  const searchRef = useRef();
  const searchCount = foundTabsData.length;
  const ids = foundTabsData.map((item) => item.id);

  useEffect(() => {
    if (searchRef.current && isActive) {
      const setFocusOnSearchBar = () => {
        searchRef.current.focus();
        searchRef.current.select();
      };

      // This must invoke after the transition!
      setTimeout(setFocusOnSearchBar, 100);
    }
  }, [searchRef, isActive]);

  // Re-fires search after tabsData changes
  useEffect(() => {
    if (searchRef.current && isActive) {
      performSearch(searchRef);
    }
  }, [tabsData, searchRef, isActive]);

  return (
    <div className="header-container">
      <div id="header" className="control">
        <GoBackBtn handleClick={() => switchToScreen('overview')} />

        <div className="header-title">
          <div className="search-container">
            <input
              type="search"
              name="search-input"
              id="search-input"
              placeholder="Type here"
              ref={searchRef}
              onKeyUp={performSearch}
            />
            <div className="search-controls">
              <span className="search-count">{`(${searchCount})`}</span>
              <button type="button" className="clear-search hidden">x</button>
            </div>
          </div>
        </div>

        <CloseAllHeaderBtn onClick={() => closeTabs(ids)} />
      </div>

      <Separator />

    </div>
  );
}
