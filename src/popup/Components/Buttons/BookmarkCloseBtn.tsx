import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Tabs } from 'webextension-polyfill';
import { addBookmarkStatus } from '../../../_modules';
import { Icon } from '../Icon';

type BookmarkCloseBtnProps = {
  data: Tabs.Tab
  handleClick: () => void 
  isHidden: boolean
  isDetail: boolean
}

type BookmarkStatus = 'hidden' | 'bookmarked' | 'bookmark-close'

export const BookmarkCloseBtn: FC<BookmarkCloseBtnProps> = (
  {
    data, handleClick, isHidden = false, isDetail = false,
  }
) => {
  const [bookmarkStatus, setBookmarkStatus] = useState<BookmarkStatus | null>(null);
  const hiddenCls = isHidden ? 'hidden' : '';

  const bookmarkResult = addBookmarkStatus(data);

  useEffect(() => {
    (async () => {
      if (!bookmarkStatus) {
        setBookmarkStatus(await bookmarkResult);
      }
    })();
  }, [bookmarkResult]);

  const isBookmarked = bookmarkStatus === 'bookmarked';
  const buttonTitle = isBookmarked ? 'Already bookmarked!' : 'Bookmark and close tab';

  return (
    <button
      type="button"
      className={classNames('bookmark', bookmarkStatus, isDetail, hiddenCls)}
      title={buttonTitle}
      onClick={!isBookmarked ? handleClick : undefined}
    >
      <Icon name='BookmarkStar' size={12} />
      <span className="hidden">{buttonTitle}</span>
    </button>
  );
};
