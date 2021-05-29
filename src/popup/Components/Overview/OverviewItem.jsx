import React, { useState } from 'react';
import { getHeaderTitle, callWithConfirm } from '../../../modules/helpers';
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

  const bookmarkOverviewTabs = (overviewObject, oId) => {
    const { url: _url, count: _count } = overviewObject;
    const folderName = getHeaderTitle(_url, 'details');

    const onTrue = () => {
      browser.runtime.sendMessage({ type: 'bookmark-all', data: { overviewObject, index: oId } });
    };

    const onFalse = () => {
      console.log('Nothing invoked.');
    };

    callWithConfirm('bookmarkAll', onTrue, onFalse, _count, folderName);
  };

  const closeOverviewTabs = (overviewObject) => {
    const { ids: _ids, count: _count } = overviewObject;

    const onFalse = () => {
      console.log('Request to close tabs from overview was declined.');
    };

    if (_count > 10) {
      callWithConfirm('closeTabs', () => closeTabs(_ids), onFalse, _count);
      return;
    }

    closeTabs(_ids);
  };

  const isBookmarkable = ['Browser tabs'].includes(url) === false;

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
      {/* https://stackoverflow.com/questions/34349136/react-how-to-capture-only-parents-onclick-event-and-not-children/47155034 */}
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
          {isBookmarkable && (
            <BookmarkAllBtn
              isHidden={isHidden}
              onClick={() => bookmarkOverviewTabs(data, itemId)}
            />
          )}
          <CloseAllOverviewBtn isHidden={isHidden} onClick={() => closeOverviewTabs(data)} />
          <GetInBtn isHidden={!isHidden} />
        </div>
      </div>
    </li>
  );
}
