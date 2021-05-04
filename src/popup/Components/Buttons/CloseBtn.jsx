import React from 'react';

export function CloseBtn({ isHidden = false, isDetail = false }) {
  const hiddenCls = isHidden ? 'hidden' : '';

  return (
    <div className={`remove ${isDetail} ${hiddenCls}`} title="Close tab" />
  );
}
