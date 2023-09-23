import { FC, useCallback, useMemo, useState } from 'react';
import Browser, { Tabs } from 'webextension-polyfill';

import { hasIgnoredProtocol, bookmarkTab, goToTab, getFormatedDate } from '../../_modules';
import { CloseTabs, useData } from '../hooks';
import { GetInBtn, BookmarkCloseBtn, CloseBtn } from './Buttons';
import { detailItem, detailItemControls } from './DetailItem.css';
import { DetailItemBody } from './DetailItemBody';
import { Favicon } from './Favicon';
import { Button } from './Buttons/Button';

export type DetailItemType = 'url' | 'lastDisplayed';

interface DetailsItemProps {
  itemId: number;
  data: Tabs.Tab;
  type: DetailItemType;
  closeTabs: CloseTabs;
  showFavicon?: boolean;
}

export const DetailsItem: FC<DetailsItemProps> = ({ itemId, data, type, closeTabs, showFavicon = false }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { refreshTabs } = useData();

  const date = getFormatedDate(data.lastAccessed) || '';
  const decodedUrl = useMemo(() => (data.url ? decodeURI(data.url) : 'Unknown website'), [data.url]);

  const handleMouseOver = useCallback(() => {
    setIsHidden(false);
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHidden(true);
  }, []);

  const handleUnlock = useCallback(() => {
    setIsUnlocked(true);
  }, []);

  const handleUnpin = useCallback(async () => {
    await Browser.tabs.update(data.id, { pinned: false });
    refreshTabs();
  }, [data.id, refreshTabs]);

  const bookmarkCloseTab = useCallback(
    (tabData: Tabs.Tab) => {
      bookmarkTab(tabData);
      closeTabs(data.id);
    },
    [closeTabs, data.id],
  );

  const handleCloseTab = useCallback(
    (tId: Tabs.Tab['id']) => {
      tId && closeTabs(tId);
    },
    [closeTabs],
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
      onClick={() => goToTab(data.id)}
      tabIndex={0}
    >
      {showFavicon && data.favIconUrl && <Favicon src={data.favIconUrl} />}

      <DetailItemBody date={date} decodedUrl={decodedUrl} title={data.title} type={type} />

      {!data.pinned || isUnlocked ? (
        <div className={detailItemControls}>
          {!hasIgnoredProtocol(data.url) && (
            <BookmarkCloseBtn tab={data} isHidden={isHidden} onClick={() => bookmarkCloseTab(data)} />
          )}

          <CloseBtn isHidden={isHidden} onClick={() => handleCloseTab(data.id)} />
          <GetInBtn isHidden={!isHidden} />
        </div>
      ) : (
        <>
          <Button title="Unpin" onClick={handleUnpin} icon="BoldPushPinSlash" size="small" isHidden={isHidden} />
          <Button title="Unlock to edit" onClick={handleUnlock} icon="BoldLockOpen" size="small" isHidden={isHidden} />
        </>
      )}
    </li>
  );
};
