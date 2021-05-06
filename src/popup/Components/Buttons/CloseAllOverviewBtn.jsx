import React from 'react';

export default function CloseAllOverviewBtn({ isHidden = false }) {
  const hiddenCls = isHidden ? 'hidden' : '';

  return (
    <button type="button" className={`remove ${hiddenCls}`} title="Close all tabs with this url">
      <span className="hidden">Close all tabs with this url</span>
    </button>
  );
}
