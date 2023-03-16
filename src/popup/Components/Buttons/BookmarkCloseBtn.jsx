import { useEffect, useState } from 'react';
import { addBookmarkStatus } from '../../../_modules';

export const BookmarkCloseBtn = (
  {
    data, handleClick, isHidden = false, isDetail = false,
  }
) => {
  const [bookmarkStatus, setBookmarkStatus] = useState(undefined);
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
      className={`bookmark ${bookmarkStatus} ${isDetail} ${hiddenCls}`}
      title={buttonTitle}
      onClick={!isBookmarked ? handleClick : undefined}
    >
      <span className="hidden">{buttonTitle}</span>
    </button>
  );
};
