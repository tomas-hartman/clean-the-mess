import { useState, VFC } from 'react';
import { Tabs } from 'webextension-polyfill';

import { hasIgnoredProtocol, bookmarkTab, goToTab } from '../../_modules';
import { CloseTabs } from '../Popup';
import { GetInBtn, BookmarkCloseBtn, CloseBtn } from './Buttons';

type DetailItemType = 'url' | 'lastDisplayed'

interface DetailsItemProps {
  itemId: number,
  data: Tabs.Tab,
  type: DetailItemType,
  closeTabs: CloseTabs,
  showFavicon?: boolean,
}

export const DetailsItem: VFC<DetailsItemProps> = props => {
  const [isHidden, setIsHidden] = useState(true);
  const {
    itemId,
    data,
    type,
    closeTabs,
    showFavicon = false,
  } = props;

  const {
    id, title, url, favIconUrl,
  } = data;

  // @ts-expect-error date is ff-only feature
  const date = data.date || undefined;

  const decodedUrl = url ? decodeURI(url) : 'Unknown website';

  // const urlCls = type === 'url' ? '' : 'hidden';
  // const lastDisplayedCls = type === 'lastDisplayed' ? '' : 'hidden';

  const handleMouseOver = () => {
    setIsHidden(false);
  };

  const handleMouseOut = () => {
    setIsHidden(true);
  };

  const bookmarkCloseTab = (tabData: Tabs.Tab) => {
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
        {type === 'url' && <div className="url detail" title={decodedUrl}>{decodedUrl}</div>}
        {(date && type === 'lastDisplayed') && (
          <div className="last-displayed detail" title={date}>{date}</div>
        )}
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
};
