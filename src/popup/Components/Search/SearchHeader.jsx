import React from 'react';

/**
 * @todo implement search functionality
 * @todo oid: which items should be deleted
 * @param {*} param0
 * @returns
 */
export default function SearchHeader({ oid, switchToScreen }) {
  return (
    <div className="header-container">
      <div id="header" className="control">
        <div className="back go-back" title="Back" />

        <div className="header-title">
          <div className="search-container">
            <input
              type="search"
              name="search-input"
              id="search-input"
              placeholder="Type here"
              autoFocus="autofocus"
            />
            <div className="search-controls">
              <span className="search-count">(9)</span>
              <button type="button" className="clear-search hidden">x</button>
            </div>
          </div>
        </div>
        <div className="close-all" title="Close all listed tabs" />
      </div>
      <div className="separator separator-bottom" />
    </div>
  );
}
