import React from 'react';

export default function CloseAllBtn({ isHidden = false }) {
  const hiddenCls = isHidden ? 'hidden' : '';

  return (
    <div className={`remove ${hiddenCls}`} title="Close all tabs with this url" />
  );
}
