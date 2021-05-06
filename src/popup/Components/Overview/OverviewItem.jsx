import React, { useState } from 'react';
import { BookmarkAllBtn, CloseAllOverviewBtn, GetInBtn } from '../Buttons';

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
      onFocus={handleMouseOver}
      onBlur={handleMouseOut}
      onKeyDown={handleMouseOver}
      onKeyUp={handleMouseOut}
      role="menuitem"
    >
      <div className="url-container">
        <div className="main-item-text-container">
          <div className="url" title={url}>{url}</div>
          <div className="count">{`(${count})`}</div>
        </div>
        <div className="item-buttons-container">
          <BookmarkAllBtn isHidden={isHidden} />
          <CloseAllOverviewBtn isHidden={isHidden} />
          <GetInBtn isHidden={!isHidden} />
        </div>
      </div>
    </li>
  );
}
