import React from 'react';
import { GoBackBtn } from '../Buttons';

export default function DetailsHeader({ title, switchToScreen }) {
  return (
    <div className="header-container">
      <div id="header" className="control">
        <GoBackBtn switchToScreen={switchToScreen} />
        <div className="header-title">www.npmjs.com</div>
        <div className="close-all" data-index-number="1" title="Close all listed tabs" />
      </div>
      <div className="separator separator-bottom" />
    </div>
  );
}
