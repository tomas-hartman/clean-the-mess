import { FC, useCallback, useState } from 'react';

import { useData } from '../hooks';
import { detailItem } from './DetailItem.css';
import { DuplicateGroup } from '../../_modules/duplicates';
import { DuplicateItemBody } from './DuplicateItemBody';
import { Button } from './Buttons/Button';

export type DetailItemType = 'url' | 'lastDisplayed';

interface DetailsItemProps {
  data: DuplicateGroup;
  showFavicon?: boolean;
}

export const DuplicateItem: FC<DetailsItemProps> = ({ data }) => {
  const [isHidden, setIsHidden] = useState(true);
  // const [isUnlocked, setIsUnlocked] = useState(false);
  const { closeTabs } = useData();

  // const date = getFormatedDate(data.lastAccessed) || '';
  // const decodedUrl = useMemo(() => (data.url ? decodeURI(data.url) : 'Unknown website'), [data.url]);

  const handleMouseOver = useCallback(() => {
    setIsHidden(false);
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHidden(true);
  }, []);

  // const handleUnlock = useCallback(() => {
  //   setIsUnlocked(true);
  // }, []);

  // const handleUnpin = useCallback(async () => {
  //   await Browser.tabs.update(data.id, { pinned: false });
  //   refreshTabs();
  // }, [data.id, refreshTabs]);

  // const bookmarkCloseTab = useCallback(
  //   (tabData: Tabs.Tab) => {
  //     bookmarkTab(tabData);
  //     closeTabs(data.id);
  //   },
  //   [closeTabs, data.id],
  // );

  const handleDeduplicate = useCallback(
    (data: DuplicateGroup) => {
      const ids = data.tabs
        .filter(tab => tab.id !== undefined)
        .sort((a, b) => a.id - b.id) // TODO
        .map(tab => tab.id || 0)
        .slice(1);

      closeTabs(ids);
    },
    [closeTabs],
  );

  console.log(data.tabs);

  return (
    <li
      // id={`item-${data.url}`}
      className={detailItem}
      // data-tab-id={data.id}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleMouseOver}
      onBlur={handleMouseOut}
      role="menuitem"
      // onClick={() => goToTab(data.id)}
      tabIndex={0}
    >
      {/* {showFavicon && data.favIconUrl && <Favicon src={data.favIconUrl} />} */}

      <DuplicateItemBody title={data.title} url={data.url} />

      <span title={`This url is open in ${data.tabs.length} tabs`}>({data.tabs.length})</span>

      <Button
        title="Close duplicate tabs and keep oldest tab"
        onClick={() => handleDeduplicate(data)}
        icon="Remove"
        size="small"
        isHidden={isHidden}
      />

      {/* {!data.pinned || isUnlocked ? (
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
      )} */}
    </li>
  );
};
