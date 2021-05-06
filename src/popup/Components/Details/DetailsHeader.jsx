import React from 'react';
import { CloseAllHeaderBtn, GoBackBtn } from '../Buttons';

export default function DetailsHeader({ oKey, title, switchToScreen }) {
  return (
    <div className="header-container">
      <div id="header" className="control">
        <GoBackBtn handleClick={() => switchToScreen('overview')} />
        <div className="header-title">{title}</div>
        <CloseAllHeaderBtn oKey={oKey} />
      </div>
      <div className="separator separator-bottom" />
    </div>
  );
}
