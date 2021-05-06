import React from 'react';

export default function GoBackBtn({ switchToScreen }) {
  return (
    <button
      type="button"
      className="back go-back"
      title="Back"
      onClick={() => switchToScreen('overview')}
    >
      <span className="hidden">
        Back
      </span>
    </button>
  );
}
