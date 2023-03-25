import { useCallback, useMemo, useState, VFC } from 'react';
import { Tabs } from 'webextension-polyfill';

import { hasIgnoredProtocol, bookmarkTab, goToTab, getFormatedDate } from '../../_modules';
import { CloseTabs } from '../hooks';
import { GetInBtn, BookmarkCloseBtn, CloseBtn } from './Buttons';
import { detailItem, detailItemControls } from './DetailItem.css';
import { DetailItemBody } from './DetailItemBody';
import { Favicon } from './Favicon';

export type DetailItemType = 'url' | 'lastDisplayed';

interface DetailsItemProps {
  itemId: number;
  data: Tabs.Tab;
  type: DetailItemType;
  closeTabs: CloseTabs;
  showFavicon?: boolean;
}

export const DetailsItem: VFC<DetailsItemProps> = ({ itemId, data, type, closeTabs, showFavicon = false }) => {
  const [isHidden, setIsHidden] = useState(true);

  const date = getFormatedDate(data.lastAccessed) || '';
  const decodedUrl = useMemo(() => (data.url ? decodeURI(data.url) : 'Unknown website'), [data.url]);

  const handleMouseOver = useCallback(() => {
    setIsHidden(false);
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHidden(true);
  }, []);

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
      className={detailItem}
      data-tab-id={data.id}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleMouseOver}
      onBlur={handleMouseOut}
      role="menuitem"
    >
      {/* Favicon */}
      {showFavicon && data.favIconUrl && <Favicon src={data.favIconUrl} />}

      {/* Body */}
      <DetailItemBody
        date={date}
        decodedUrl={decodedUrl}
        id={data.id}
        title={data.title}
        type={type}
        goToTab={goToTab}
      />

      {/* Controls */}
      <div className={detailItemControls}>
        {!hasIgnoredProtocol(data.url) && (
          <BookmarkCloseBtn tab={data} isHidden={isHidden} isDetail handleClick={() => bookmarkCloseTab(data)} />
        )}
        <CloseBtn isHidden={isHidden} isDetail tId={data.id} closeTabs={closeTabs} />
        <GetInBtn isHidden={!isHidden} />
      </div>
    </li>
  );
};
