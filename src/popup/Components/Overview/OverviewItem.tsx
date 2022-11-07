import React, { useState, VFC } from 'react';
import { OverviewItem as OverviewItemType } from '../../../types';

import { getHeaderTitle, callWithConfirm, bookmarkAll } from '../../../_modules';
import { CloseTabs, SwitchToScreenType } from '../../Popup';
import { BookmarkAllBtn, CloseAllOverviewBtn, GetInBtn } from '../Buttons';

type OverviewItemProps = {
  itemId: number,
  data: OverviewItemType,
  switchToScreen: SwitchToScreenType,
  closeTabs: CloseTabs,
  showFavicon: boolean,
};

export const OverviewItem: VFC<OverviewItemProps> = props => {
  const [isHidden, setIsHidden] = useState(true);
  const {
    itemId,
    data,
    switchToScreen,
    closeTabs,
    showFavicon = true,
  } = props;

  const {
    url, count, key, ids, favicon,
  } = data;

  const handleMouseOver = () => {
    setIsHidden(false);
  };

  const handleMouseOut = () => {
    setIsHidden(true);
  };

  const bookmarkOverviewTabs = (overviewObject: OverviewItemType, oId: number) => {
    const { url: _url, count: _count } = overviewObject;
    const folderName = getHeaderTitle(_url, 'details');

    const onTrue = () => {
      bookmarkAll(overviewObject, oId);
    };

    const onFalse = () => {
      console.log('Nothing invoked.');
    };

    callWithConfirm('bookmarkAll', onTrue, onFalse, `${_count}`, folderName);
  };

  const closeOverviewTabs = (overviewObject: OverviewItemType) => {
    const { ids: _ids, count: _count } = overviewObject;

    const onFalse = () => {
      console.log('Request to close tabs from overview was declined.');
    };

    if (_count > 10) {
      callWithConfirm('closeTabs', () => closeTabs(_ids), onFalse, `${_count}`);
      return;
    }

    closeTabs(_ids);
  };

  const isBookmarkable = !!url && ['Browser tabs'].includes(url) === false;
  const displayedUrl = getHeaderTitle(url, 'details');

  return (
    <li
      className={`url-${itemId} item item-overview`}
      data-key={key}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleMouseOver}
      onBlur={handleMouseOut}
      onKeyDown={handleMouseOver}
      onKeyUp={handleMouseOut}
      role="menuitem"
    >

      {(showFavicon) && <div className="favicon item--favicon" style={{ backgroundImage: `url(${favicon})` }} />}

      {/* https://stackoverflow.com/questions/34349136/react-how-to-capture-only-parents-onclick-event-and-not-children/47155034 */}
      <div
        className="item--text-container-overview item--text-container"
        onClick={() => switchToScreen('details', { ids, url, key })}
        onKeyPress={() => switchToScreen('details', { ids, url, key })}
        role="link"
        tabIndex={0}
      >
        <div className="url" title={url}>{displayedUrl}</div>
        <div className="count">{`(${count})`}</div>
      </div>

      <div className="item--controls-container">
        {isBookmarkable && (
        <BookmarkAllBtn
          isHidden={isHidden}
          onClick={() => bookmarkOverviewTabs(data, itemId)}
        />
        )}
        <CloseAllOverviewBtn isHidden={isHidden} onClick={() => closeOverviewTabs(data)} />
        <GetInBtn isHidden={!isHidden} />
      </div>

    </li>
  );
};
