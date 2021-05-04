import React from 'react';

export function BookmarkAllBtn({ isHidden = false }) {
  const hiddenCls = isHidden ? 'hidden' : '';

  return (
    <div className={`bookmark-all ${hiddenCls}`} title="Bookmark and close all items" />
  );
}
