import React from 'react';
import Separator from '../Separator';
import { GoBackBtn } from '../Buttons';

export default function LatestHeader(props) {
  const { title, switchToScreen } = props;

  return (
    <div className="header-container">
      <div id="header" className="control">
        <GoBackBtn handleClick={() => switchToScreen('overview')} />
        <div className="header-title">{title}</div>
      </div>
      <Separator />
    </div>
  );
}
