import React from 'react';
import { CloseAllHeaderBtn, GoBackBtn } from '../Buttons';

export default function DetailsHeader({ oid, title, switchToScreen }) {
  return (
    <div className="header-container">
      <div id="header" className="control">
        <GoBackBtn switchToScreen={switchToScreen} />
        <div className="header-title">{title}</div>
        <CloseAllHeaderBtn oid={oid} />
      </div>
      <div className="separator separator-bottom" />
    </div>
  );
}
