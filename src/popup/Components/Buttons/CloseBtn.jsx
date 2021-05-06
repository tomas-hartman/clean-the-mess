import React from 'react';

export default function CloseBtn({ isHidden = false, isDetail = false }) {
  const hiddenCls = isHidden ? 'hidden' : '';

  return (
    <button type="button" className={`remove ${isDetail} ${hiddenCls}`} title="Close tab">
      <span className="hidden">Close tab</span>
    </button>
  );
}
