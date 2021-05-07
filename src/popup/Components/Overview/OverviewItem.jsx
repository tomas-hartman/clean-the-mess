import React, { useState } from 'react';
import { BookmarkAllBtn, CloseAllOverviewBtn, GetInBtn } from '../Buttons';

export default function OverviewItem(props) {
  const [isHidden, setIsHidden] = useState(true);
  const {
    itemId, data, switchToScreen, closeTabs,
  } = props;
  const {
    url, count, key, ids,
  } = data;

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
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleMouseOver}
      onBlur={handleMouseOut}
      onKeyDown={handleMouseOver}
      onKeyUp={handleMouseOut}
      role="menuitem"
    >
      <div className="url-container">
        <div
          className="main-item-text-container"
          onClick={() => switchToScreen('details', { ids, url, key })}
          onKeyPress={() => switchToScreen('details', { ids, url, key })}
          role="link"
          tabIndex={0}
        >
          <div className="url" title={url}>{url}</div>
          <div className="count">{`(${count})`}</div>
        </div>
        <div className="item-buttons-container">
          <BookmarkAllBtn isHidden={isHidden} />
          <CloseAllOverviewBtn isHidden={isHidden} ids={ids} closeTabs={closeTabs} />
          <GetInBtn isHidden={!isHidden} />
        </div>
      </div>
    </li>
  );
}
