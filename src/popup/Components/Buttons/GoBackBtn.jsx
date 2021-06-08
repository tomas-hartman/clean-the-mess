import React from 'react';

/**
 * Go back button. Used on screen headers.
 * @param {Object} param0
 * @param {Function} param0.handleClick switchToScreen function with desired destination
 * @returns {JSX.Element}
 */
export default function GoBackBtn({ handleClick }) {
  return (
    <button
      type="button"
      className="back go-back"
      title="Back"
      onClick={handleClick}
    >
      <span className="hidden">
        Back
      </span>
    </button>
  );
}
