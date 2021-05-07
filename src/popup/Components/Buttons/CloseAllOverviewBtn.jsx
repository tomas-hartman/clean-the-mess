import React from 'react';

export default function CloseAllOverviewBtn({ ids, isHidden = false, closeTabs }) {
  const hiddenCls = isHidden ? 'hidden' : '';

  return (
    <button
      type="button"
      className={`remove ${hiddenCls}`}
      title="Close all tabs with this url"
      onClick={() => closeTabs(ids)}
    >
      <span className="hidden">Close all tabs with this url</span>
    </button>
  );
}
