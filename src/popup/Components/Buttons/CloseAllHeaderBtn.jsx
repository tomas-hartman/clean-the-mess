import React from 'react';
import { callWithConfirm } from '../../../_modules';

export default function CloseAllHeaderBtn({ onClick, itemCount }) {
  const handleClick = () => {
    if (itemCount > 15) {
      callWithConfirm('closeTabs', onClick, () => true, itemCount);
      return;
    }

    onClick();
  };

  return (
    <button type="button" className="close-all" title="Close all listed tabs" onClick={handleClick}>
      <span className="hidden">Close all listed tabs</span>
    </button>
  );
}
