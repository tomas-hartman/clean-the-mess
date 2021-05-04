import React from 'react';

export function CloseAllBtn({ isHidden = false }) {
  const hiddenCls = isHidden ? 'hidden' : '';

  return (
    <div className={`remove ${hiddenCls}`} title="Close all tabs with this url" />
  );
}
