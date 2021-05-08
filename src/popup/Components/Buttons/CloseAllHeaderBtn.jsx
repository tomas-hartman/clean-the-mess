import React from 'react';

export default function CloseAllHeaderBtn({ onClick }) {
  return (
    <button type="button" className="close-all" title="Close all listed tabs" onClick={onClick}>
      <span className="hidden">Close all listed tabs</span>
    </button>
  );
}
