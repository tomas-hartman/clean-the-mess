import React from 'react';
import { BookmarkAllBtn, CloseAllBtn, GetInBtn } from '../Buttons';

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
          <GetInBtn />
          <BookmarkAllBtn isHidden />
          <CloseAllBtn isHidden />
        </div>
      </div>
    </li>
  );
}
