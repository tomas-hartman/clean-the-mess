import React, { useState } from 'react';

import { escapeHTML, hasIgnoredProtocol } from '../../../modules/helpers';
import { GetInBtn, BookmarkCloseBtn, CloseBtn } from '../Buttons';

export default function DetailsItem(props) {
  const [isHidden, setIsHidden] = useState(true);
  const { itemId, data, type } = props;
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

  return (
    <li
      id={`item-${itemId}`}
      className="detail"
      data-tab-id={id}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="item-container detail">

        <div className="item-text-container">
          <div className="title detail" title={escapedTitle}>{escapedTitle}</div>
          <div className={`url detail ${urlCls}`} title={decodedUrl}>{decodedUrl}</div>
          <div className={`last-displayed detail ${lastDisplayedCls}`} title={date}>{date}</div>
        </div>

        <div className="item-buttons-container">
          {!hasIgnoredProtocol(url) && <BookmarkCloseBtn isHidden={isHidden} isDetail />}
          <CloseBtn isHidden={isHidden} isDetail />
          <GetInBtn isHidden={!isHidden} />
        </div>

      </div>
    </li>
  );
}
