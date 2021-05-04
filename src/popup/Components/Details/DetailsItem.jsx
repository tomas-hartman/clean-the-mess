import React from 'react';
import { escapeHTML, hasIgnoredProtocol } from '../../../modules/helpers';
import { GetInBtn, BookmarkCloseBtn, CloseBtn } from '../Buttons';

export function DetailsItem(props) {
  let { itemId, data, type } = props;
  let { id, title, url, date } = data;

  const decodedUrl = escapeHTML(decodeURI(url));
  const escapedTitle = escapeHTML(title);

  const urlCls = type === 'url' ? '' : 'hidden';
  const lastDisplayedCls = type === 'lastDisplayed' ? '' : 'hidden';

  return (
    <li id={`item-${itemId}`} className="detail" data-tab-id={id}>
      <div className="item-container detail">

        <div className="item-text-container">
          <div className="title detail" title={escapedTitle}>{escapedTitle}</div>
          <div className={`url detail ${urlCls}`} title={decodedUrl}>{decodedUrl}</div>
          <div className={`last-displayed detail ${lastDisplayedCls}`} title={date}>{date}</div>
        </div>

        <div className="item-buttons-container">
          {!hasIgnoredProtocol(url) && <BookmarkCloseBtn isHidden isDetail />}
          <CloseBtn isHidden isDetail />
          <GetInBtn />
        </div>

      </div>
    </li>
  );
}
