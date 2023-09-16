import { FC, useCallback, useMemo, useState } from 'react';
import type { OverviewItem as OverviewItemType } from '../../../types';
import { getHeaderTitle } from '../../../_modules';
import { BookmarkAllBtn, CloseAllOverviewBtn, GetInBtn } from '../../components/Buttons';
import { Favicon } from '../../components/Favicon';
import { CloseTabs } from '../../hooks';
import { overviewItem, overviewItemControls, overviewItemCount } from './OverviewItem.css';
import { bookmarkOverviewTabs, closeOverviewTabs } from './OverviewItem.utils';
import { OverviewItemBody } from './OverviewItemBody';
import { useNavigate } from '../../providers';

type OverviewItemProps = {
  itemId: number;
  data: OverviewItemType;
  closeTabs: CloseTabs;
  showFavicon: boolean;
};

export const OverviewItem: FC<OverviewItemProps> = ({ itemId, data, showFavicon = true, closeTabs }) => {
  const { switchToScreen } = useNavigate();
  const [isHidden, setIsHidden] = useState(true);

  const { url, count, key, ids, favicon } = data;

  const handleMouseOver = () => {
    setIsHidden(false);
  };

  const handleMouseOut = () => {
    setIsHidden(true);
  };

  const handleDetailClick = useCallback(() => {
    switchToScreen('details', {
      ids,
      url,
      key,
    });
  }, [ids, key, url, switchToScreen]);

  const isBookmarkable = useMemo(() => {
    return !!url && ['Browser tabs'].includes(url) === false;
  }, [url]);

  const displayedUrl = useMemo(() => getHeaderTitle(url, 'details'), [url]);

  return (
    <li
      className={overviewItem}
      data-key={key}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleMouseOver}
      onBlur={handleMouseOut}
      onKeyDown={handleMouseOver}
      onKeyUp={handleMouseOut}
      onClick={handleDetailClick}
      role="menuitem"
      tabIndex={0}
    >
      {/* TODO: add marginRight: 12px */}
      {showFavicon && <Favicon src={favicon} />}

      <OverviewItemBody url={url} displayedUrl={displayedUrl} />

      <div className={overviewItemControls}>
        <span className={overviewItemCount}>{`(${count})`}</span>
        {isBookmarkable && <BookmarkAllBtn isHidden={isHidden} onClick={() => bookmarkOverviewTabs(data, itemId)} />}
        <CloseAllOverviewBtn isHidden={isHidden} onClick={() => closeOverviewTabs(data, closeTabs)} />
        <GetInBtn isHidden={!isHidden} />
      </div>
    </li>
  );
};
