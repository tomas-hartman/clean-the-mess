import { FC } from 'react';
import { Button } from './Button';

type BookmarkAllBtnProps = {
  isHidden?: boolean;
  onClick: () => void;
};

export const BookmarkAllBtn: FC<BookmarkAllBtnProps> = ({ isHidden = false, onClick }) => (
  <Button
    title="Bookmark and close all items"
    onClick={onClick}
    size="small"
    icon="BookmarkClose"
    isHidden={isHidden}
  />
);
