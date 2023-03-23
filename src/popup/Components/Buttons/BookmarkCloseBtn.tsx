import classNames from 'classnames';
import { FC } from 'react';
import { Tabs } from 'webextension-polyfill';
import { useBookmarkStatus } from '../../hooks';
import { Icon } from '../Icon';

type BookmarkCloseBtnProps = {
  tab: Tabs.Tab;
  handleClick: () => void;
  isHidden: boolean;
  isDetail: boolean;
};

export const BookmarkCloseBtn: FC<BookmarkCloseBtnProps> = ({
  tab,
  handleClick,
  isHidden = false,
  isDetail = false,
}) => {
  const { bookmarkStatus, isBookmarked } = useBookmarkStatus({ tab });

  const buttonTitle = isBookmarked ? 'Already bookmarked!' : 'Bookmark and close tab';

  return (
    <button
      type="button"
      className={classNames('bookmark', bookmarkStatus, isDetail, { hidden: isHidden })}
      title={buttonTitle}
      onClick={!isBookmarked ? handleClick : undefined}
    >
      <Icon name={isBookmarked ? 'BookmarkStarFull' : 'BookmarkClose'} size={12} />
      <span className="hidden">{buttonTitle}</span>
    </button>
  );
};
