import { useMemo, useState, VFC } from 'react';
import type { OverviewItem as OverviewItemType } from '../../../types';
import { getHeaderTitle } from '../../../_modules';
import { BookmarkAllBtn, CloseAllOverviewBtn, GetInBtn } from '../../components/Buttons';
import { bookmarkOverviewTabs, closeOverviewTabs } from './OverviewItem.utils';
import { CloseTabs, useNavigate } from '../../hooks';

type OverviewItemProps = {
  itemId: number;
  data: OverviewItemType;
  closeTabs: CloseTabs;
  showFavicon: boolean;
};

export const OverviewItem: VFC<OverviewItemProps> = ({ itemId, data, showFavicon = true, closeTabs }) => {
  const { switchToScreen } = useNavigate();
  const [isHidden, setIsHidden] = useState(true);

  const { url, count, key, ids, favicon } = data;

  const handleMouseOver = () => {
    setIsHidden(false);
  };

  const handleMouseOut = () => {
    setIsHidden(true);
  };

  const isBookmarkable = useMemo(() => {
    return !!url && ['Browser tabs'].includes(url) === false;
  }, [url]);

  const displayedUrl = useMemo(() => getHeaderTitle(url, 'details'), [url]);

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
      {showFavicon && <div className="favicon item--favicon" style={{ backgroundImage: `url(${favicon})` }} />}

      {/* https://stackoverflow.com/questions/34349136/react-how-to-capture-only-parents-onclick-event-and-not-children/47155034 */}
      <div
        className="item--text-container-overview item--text-container"
        onClick={() => switchToScreen('details', { ids, url, key })}
        onKeyPress={() => switchToScreen('details', { ids, url, key })}
        role="link"
        tabIndex={0}
      >
        <div className="url" title={url}>
          {displayedUrl}
        </div>
        <div className="count">{`(${count})`}</div>
      </div>

      <div className="item--controls-container">
        {isBookmarkable && <BookmarkAllBtn isHidden={isHidden} onClick={() => bookmarkOverviewTabs(data, itemId)} />}
        <CloseAllOverviewBtn isHidden={isHidden} onClick={() => closeOverviewTabs(data, closeTabs)} />
        <GetInBtn isHidden={!isHidden} />
      </div>
    </li>
  );
};
