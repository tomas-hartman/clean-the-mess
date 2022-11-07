import React from 'react';
import { Separator } from '../Separator';
import { CloseAllHeaderBtn, GoBackBtn } from '../Buttons';

export default function DetailsHeader(props) {
  const {
    title, switchToScreen, overviewData, closeTabs,
  } = props;

  return (
    <div className="header-container">
      <div id="header" className="control">
        <GoBackBtn handleClick={() => switchToScreen('overview')} />
        <div className="header--details-title">
          <div className="favicon header--favicon" style={{ backgroundImage: `url(${overviewData?.favicon})` }} />
          <span>{title}</span>
        </div>
        <CloseAllHeaderBtn
          onClick={() => closeTabs(overviewData?.ids)}
          itemCount={overviewData?.ids.length}
        />
      </div>
      <Separator />
    </div>
  );
}
