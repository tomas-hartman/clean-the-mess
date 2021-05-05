import React from 'react';

export default function BookmarkCloseBtn({ isHidden = false, isDetail = false }) {
  const hiddenCls = isHidden ? 'hidden' : '';

  return (
    <div className={`bookmark bookmark-close ${isDetail} ${hiddenCls}`} title="Bookmark and close tab" />
  );
}
