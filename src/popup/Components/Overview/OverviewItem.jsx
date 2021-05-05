import React, { useState } from 'react';
import { BookmarkAllBtn, CloseAllBtn, GetInBtn } from '../Buttons';

export default function OverviewItem(tabData) {
  const [isHidden, setIsHidden] = useState(true);
  const { itemId, data, switchToScreen } = tabData;
  const { url, count, key } = data;

  const handleMouseOver = () => {
    setIsHidden(false);
  };

  const handleMouseOut = () => {
    setIsHidden(true);
  };

  return (
    <li
      className={`url-${itemId} overview-item`}
      data-key={key}
      onClick={() => switchToScreen('details')}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="url-container">
        <div className="main-item-text-container">
          <div className="url" title={url}>{url}</div>
          <div className="count">
            (
            {count}
            )
          </div>
        </div>
        <div className="item-buttons-container">
          <BookmarkAllBtn isHidden={isHidden} />
          <CloseAllBtn isHidden={isHidden} />
          <GetInBtn isHidden={!isHidden} />
        </div>
      </div>
    </li>
  );
}
