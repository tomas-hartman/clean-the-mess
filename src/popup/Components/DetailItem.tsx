import clsx from 'clsx';
import { useCallback, useState, VFC } from 'react';
import { Tabs } from 'webextension-polyfill';

import { hasIgnoredProtocol, bookmarkTab, goToTab } from '../../_modules';
import { CloseTabs } from '../hooks';
import { GetInBtn, BookmarkCloseBtn, CloseBtn } from './Buttons';

type DetailItemType = 'url' | 'lastDisplayed';

interface DetailsItemProps {
  itemId: number;
  data: Tabs.Tab;
  type: DetailItemType;
  closeTabs: CloseTabs;
  showFavicon?: boolean;
}

export const DetailsItem: VFC<DetailsItemProps> = ({ itemId, data, type, closeTabs, showFavicon = false }) => {
  const [isHidden, setIsHidden] = useState(true);

  // @ts-expect-error date is ff-only feature
  const date = data.date || undefined;

  const decodedUrl = data.url ? decodeURI(data.url) : 'Unknown website';

  const handleMouseOver = () => {
    setIsHidden(false);
  };

  const handleMouseOut = () => {
    setIsHidden(true);
  };

  const bookmarkCloseTab = useCallback(
    (tabData: Tabs.Tab) => {
      bookmarkTab(tabData);
      closeTabs(data.id);
    },
    [closeTabs, data.id],
  );

  return (
    <li
      id={`item-${itemId}`}
      className={clsx('detail', 'item', 'item-detail')}
      data-tab-id={data.id}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleMouseOver}
      onBlur={handleMouseOut}
      role="menuitem"
    >
      {data.favIconUrl && showFavicon && (
        <div
          className="favicon item--favicon"
          style={{
            backgroundImage: `url(${data.favIconUrl})`,
          }}
        />
      )}

      <div
        className="item--text-container"
        onClick={() => {
          goToTab(data.id);
        }}
        onKeyPress={() => {
          goToTab(data.id);
        }}
        role="link"
        tabIndex={0}
      >
        <div className="title detail" title={data.title}>
          {data.title}
        </div>
        {type === 'url' && (
          <div className="url detail" title={decodedUrl}>
            {decodedUrl}
          </div>
        )}
        {date && type === 'lastDisplayed' && (
          <div className="last-displayed detail" title={date}>
            {date}
          </div>
        )}
      </div>

      <div className="item--controls-container">
        {!hasIgnoredProtocol(data.url) && (
          <BookmarkCloseBtn tab={data} isHidden={isHidden} isDetail handleClick={() => bookmarkCloseTab(data)} />
        )}
        <CloseBtn isHidden={isHidden} isDetail tId={data.id} closeTabs={closeTabs} />
        <GetInBtn isHidden={!isHidden} />
      </div>
    </li>
  );
};
