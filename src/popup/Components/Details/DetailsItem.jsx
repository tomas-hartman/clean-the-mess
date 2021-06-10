import React, { useState } from 'react';

import { hasIgnoredProtocol, bookmarkTab, goToTab } from '../../../_modules';
import { GetInBtn, BookmarkCloseBtn, CloseBtn } from '../Buttons';

function DetailsItem(props) {
  const [isHidden, setIsHidden] = useState(true);
  const {
    itemId,
    data,
    type,
    closeTabs,
    showFavicon = false,
  } = props;

  const {
    id, title, url, date, favIconUrl,
  } = data;

  const decodedUrl = decodeURI(url);

  const urlCls = type === 'url' ? '' : 'hidden';
  const lastDisplayedCls = type === 'lastDisplayed' ? '' : 'hidden';

  const handleMouseOver = () => {
    setIsHidden(false);
  };

  const handleMouseOut = () => {
    setIsHidden(true);
  };

  const bookmarkCloseTab = (tabData) => {
    bookmarkTab(tabData);
    closeTabs(id);
  };

  return (
    <li
      id={`item-${itemId}`}
      className="detail item item-detail"
      data-tab-id={id}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleMouseOver}
      onBlur={handleMouseOut}
      role="menuitem"
    >

      {(favIconUrl && showFavicon)
      && (
        <div
          className="favicon item--favicon"
          style={{
            backgroundImage: `url(${favIconUrl})`,
          }}
        />
      )}

      <div
        className="item--text-container"
        onClick={() => { goToTab(id); }}
        onKeyPress={() => { goToTab(id); }}
        role="link"
        tabIndex={0}
      >
        <div className="title detail" title={title}>{title}</div>
        <div className={`url detail ${urlCls}`} title={decodedUrl}>{decodedUrl}</div>
        <div className={`last-displayed detail ${lastDisplayedCls}`} title={date}>{date}</div>
      </div>

      <div className="item--controls-container">
        {!hasIgnoredProtocol(url) && (
        <BookmarkCloseBtn
          data={data}
          isHidden={isHidden}
          isDetail
          handleClick={() => bookmarkCloseTab(data)}
        />
        )}
        <CloseBtn
          isHidden={isHidden}
          isDetail
          tId={id}
          closeTabs={closeTabs}
        />
        <GetInBtn isHidden={!isHidden} />
      </div>
    </li>
  );
}

export default DetailsItem;
