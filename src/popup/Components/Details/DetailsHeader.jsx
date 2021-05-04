import React from 'react';

export function DetailsHeader() {
  return (
    <div className="header-container">
      <div id="header" className="control">
        <div className="back go-back" title="Back"></div>
        <div className="header-title">www.npmjs.com</div>
        <div className="close-all" data-index-number="1" title="Close all listed tabs"></div>
      </div>
      <div className="separator separator-bottom"></div>
    </div>
  );
}
