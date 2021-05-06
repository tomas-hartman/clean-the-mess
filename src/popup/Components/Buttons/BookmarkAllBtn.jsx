import React from 'react';

export default function BookmarkAllBtn({ isHidden = false }) {
  const hiddenCls = isHidden ? 'hidden' : '';

  return (
    <button type="button" className={`bookmark-all ${hiddenCls}`} title="Bookmark and close all items">
      <span className="hidden">Bookmark and close all items</span>
    </button>
  );
}
