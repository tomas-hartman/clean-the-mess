import React from 'react';

export default function CloseAllHeaderBtn({ handleClick }) {
  return (
    <button type="button" className="close-all" title="Close all listed tabs" onClick={handleClick}>
      <span className="hidden">Close all listed tabs</span>
    </button>
  );
}
