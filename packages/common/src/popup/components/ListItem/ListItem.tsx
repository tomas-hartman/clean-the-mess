import { FC, ReactNode, useCallback, useState } from 'react';
import {
  detailItem,
  detailItemBody,
  detailItemBodyExtraText,
  detailItemBodyText,
  detailItemControls,
} from './ListItem.css';
import { Favicon } from '../Favicon';
import { Tabs } from 'webextension-polyfill';

export type ListItemProps = {
  primaryText: string;
  secondaryText?: string;
  secondaryTextTitle?: string;
  extraActionInfo?: ReactNode;
  initActions?: ReactNode;
  hoverActions?: ReactNode;
  onClick?: () => void;
  favicon?: string;
};

export type PinnedListItemProps = {
  data: Tabs.Tab;
  showFavicon: boolean;
};

export const ListItem: FC<ListItemProps> = ({
  primaryText,
  secondaryText,
  secondaryTextTitle,
  favicon,
  onClick,
  extraActionInfo,
  hoverActions,
  initActions,
}) => {
  const [isHidden, setIsHidden] = useState(true);

  const handleMouseOver = useCallback(() => {
    setIsHidden(false);
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHidden(true);
  }, []);

  return (
    <li
      className={detailItem}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleMouseOver}
      onBlur={handleMouseOut}
      role="menuitem"
      onClick={onClick}
      tabIndex={0}
    >
      {favicon && <Favicon src={favicon} />}

      <div className={detailItemBody}>
        <span className={detailItemBodyText} title={primaryText}>
          {primaryText}
        </span>
        {secondaryText && (
          <span className={detailItemBodyExtraText} title={secondaryTextTitle || secondaryText}>
            {secondaryText}
          </span>
        )}
      </div>

      {(initActions || hoverActions || extraActionInfo) && (
        <div className={detailItemControls}>
          {extraActionInfo}
          {initActions && !hoverActions ? initActions : isHidden ? initActions : hoverActions}
        </div>
      )}
    </li>
  );
};
