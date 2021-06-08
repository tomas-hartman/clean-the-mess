import React from 'react';

export default function GetInBtn({ isHidden = false }) {
  const isHiddenCls = isHidden ? 'hidden' : '';

  return (
    <button type="button" className={`get-in ${isHiddenCls}`}>
      <span className="hidden">Get in</span>
    </button>
  );
}
