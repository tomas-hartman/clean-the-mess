import React from 'react';

export default function SearchBtn({ switchToScreen }) {
  return (
    <button type="button" id="search-btn" title="Search" onClick={() => switchToScreen('search')}>
      <span className="hidden">Search</span>
    </button>
  );
}
