import React from 'react';

export const CloseAllOverviewBtn = ({ onClick, isHidden = false }) => {
  const hiddenCls = isHidden ? 'hidden' : '';

  return (
    <button
      type="button"
      className={`remove ${hiddenCls}`}
      title="Close all tabs with this url"
      onClick={onClick}
    >
      <span className="hidden">Close all tabs with this url</span>
    </button>
  );
};
