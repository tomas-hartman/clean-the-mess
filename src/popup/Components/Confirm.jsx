import React from 'react';

export default function Confirm() {
  return (
    <div className="confirm">
      <div className="confirm-box">
        <div className="confirm-message-box">
          Are you sure you want to add 12 tabs to \"google.com\" folder in bookmarks and close them?
        </div>
        <div className="confirm-buttons-section-wrapper">
          <div className="separator separator-bottom" />
          <div className="confirm-buttons-section">
            <button className="confirm-btn" type="button">Cancel</button>
            <button className="confirm-btn" type="button">OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}
