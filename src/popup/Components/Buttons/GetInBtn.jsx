import React from 'react';

export default function GetInBtn({ isHidden = false }) {
  const isHiddenCls = isHidden ? 'hidden' : '';

  return (
    <div className={`get-in ${isHiddenCls}`} />
  );
}
