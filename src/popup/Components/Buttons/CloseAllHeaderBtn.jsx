import React from 'react';

export default function CloseAllHeaderBtn({ oid = 1 }) {
  return (
    <button type="button" className="close-all" data-index-number={oid} title="Close all listed tabs">
      <span className="hidden">Close all listed tabs</span>
    </button>
  );
}
