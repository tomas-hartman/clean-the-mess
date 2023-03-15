import React from 'react';

export const BookmarkAllBtn = ({ isHidden = false, onClick }) => {
  const hiddenCls = isHidden ? 'hidden' : '';

  return (
    <button type="button" className={`bookmark-all ${hiddenCls}`} title="Bookmark and close all items" onClick={onClick}>
      <span className="hidden">Bookmark and close all items</span>
    </button>
  );
};
