import React from 'react';

export default function BookmarkCloseBtn({ isHidden = false, isDetail = false }) {
  const hiddenCls = isHidden ? 'hidden' : '';

  return (
    <button type="button" className={`bookmark bookmark-close ${isDetail} ${hiddenCls}`} title="Bookmark and close tab">
      <span className="hidden">Bookmark and close tab</span>
    </button>
  );
}
