import classNames from 'classnames';
import { FC } from 'react';
import { Icon } from '../Icon';

type BookmarkAllBtnProps = { 
  isHidden?: boolean, 
  onClick: () => void
}

export const BookmarkAllBtn: FC<BookmarkAllBtnProps> = ({ isHidden = false, onClick }) => {
  const hiddenCls = isHidden && 'hidden';

  return (
    <button type="button" className={classNames('bookmark-all', hiddenCls)} title="Bookmark and close all items" onClick={onClick}>
      <Icon name='BookmarkClose' size={12} />
      <span className="hidden">Bookmark and close all items</span>
    </button>
  );
};
