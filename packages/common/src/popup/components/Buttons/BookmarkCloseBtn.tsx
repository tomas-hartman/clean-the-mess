import { FC } from 'react';
import { Tabs } from 'webextension-polyfill';
import { useBookmarkStatus } from '../../hooks';
import { Button } from './Button';

type BookmarkCloseBtnProps = {
  tab: Tabs.Tab;
  onClick: () => void;
  isHidden?: boolean;
};

export const BookmarkCloseBtn: FC<BookmarkCloseBtnProps> = ({ tab, onClick: handleClick, isHidden = false }) => {
  const { isBookmarked } = useBookmarkStatus({ tab });

  const buttonTitle = isBookmarked ? 'Already bookmarked!' : 'Bookmark and close tab';
  const buttonIcon = isBookmarked ? 'BookmarkStarFull' : 'BookmarkClose';

  return (
    <Button
      title={buttonTitle}
      onClick={!isBookmarked ? handleClick : () => true}
      icon={buttonIcon}
      size="small"
      isHidden={isHidden}
    />
  );
};
