import React from 'react';

export function OverviewItem(tabData) {
  let { itemId, data } = tabData;
  let { url, count, key } = data;

  return (
    <li className={`url-${itemId} overview-item`} data-key={key}>
      <div className="url-container">
        <div className="main-item-text-container">
          <div className="url" title={url}>{url}</div>
          <div className="count">({count})</div>
        </div>
        <div className="item-buttons-container">
          <div className="get-in"></div>
          <div className="bookmark-all hidden" title="Bookmark and close all items"></div>
          <div className="remove hidden" title="Close all tabs with this url"></div>
        </div>
      </div>
    </li>
  );
}

export function OverviewHeader() {
  return (
    <div className="header-container">
      <div id="header" className="control header-overview">
        <div className="header-title">
          <span>You have <span id="open-tabs-count">109</span> opened tabs in this window.</span>
        </div>
        <div id="search-btn"></div>
      </div>
      <div className="separator separator-bottom"></div>
      <div id="ten-unused">
        <span>10 longest unused tabs</span>
        <div className="get-in"></div>
      </div>
      <div className="separator separator-bottom"></div>
    </div>
  );
}



export default function OverviewScreen() {
  return (
    <div id="overview" className="screen">
      <OverviewHeader />
      <div className="body-container">
        <ul id="list">
          <OverviewItem />
        </ul>
      </div>
    </div>
  );
}
