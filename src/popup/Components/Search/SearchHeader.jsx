import React from 'react';
import { CloseAllHeaderBtn, GoBackBtn } from '../Buttons';
import Separator from '../Separator';

/**
 * @todo implement search functionality
 * @todo oid: which items should be deleted
 * @param {*} param0
 * @returns
 */
export default function SearchHeader({ oKey, switchToScreen }) {
  const searchCount = 9;

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
              // autoFocus="autofocus" // @todo turn on first after animation transition!!
            />
            <div className="search-controls">
              <span className="search-count">{`(${searchCount})`}</span>
              <button type="button" className="clear-search hidden">x</button>
            </div>
          </div>
        </div>

        <CloseAllHeaderBtn />
      </div>

      <Separator />

    </div>
  );
}
