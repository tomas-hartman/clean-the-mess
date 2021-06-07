import React, { useState } from 'react';

import browser from 'webextension-polyfill';

import { escapeHTML, hasIgnoredProtocol, bookmarkTab } from '../../../_modules';
import { GetInBtn, BookmarkCloseBtn, CloseBtn } from '../Buttons';

export default function DetailsItem(props) {
  const [isHidden, setIsHidden] = useState(true);
  const {
    itemId, data, type, closeTabs,
  } = props;
  const {
    id, title, url, date,
  } = data;

  const decodedUrl = escapeHTML(decodeURI(url));
  const escapedTitle = escapeHTML(title);

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

  const goToTab = async (_id) => {
    await browser.tabs.update(_id, { active: true });
  };

  return (
    <li
      id={`item-${itemId}`}
      className="detail"
      data-tab-id={id}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleMouseOver}
      onBlur={handleMouseOut}
      role="menuitem"
    >
      <div className="item-container detail">

        <div
          className="item-text-container"
          onClick={() => { goToTab(id); }}
          onKeyPress={() => { goToTab(id); }}
          role="link"
          tabIndex={0}
        >
          <div className="title detail" title={escapedTitle}>{escapedTitle}</div>
          <div className={`url detail ${urlCls}`} title={decodedUrl}>{decodedUrl}</div>
          <div className={`last-displayed detail ${lastDisplayedCls}`} title={date}>{date}</div>
        </div>

        <div className="item-buttons-container">
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

      </div>
    </li>
  );
}
