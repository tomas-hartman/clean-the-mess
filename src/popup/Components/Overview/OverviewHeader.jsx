import React from 'react';
import { GetInBtn, SearchBtn } from '../Buttons';
import Separator from '../Separator';

export default function OverviewHeader({ switchToScreen, openTabs }) {
  return (
    <div className="header-container">

      <div id="header" className="control header-overview">
        <div className="header-title">
          <span>
            You have
            {' '}
            <span id="open-tabs-count">{openTabs}</span>
            {' '}
            opened tabs in this window.
          </span>
        </div>
        <SearchBtn switchToScreen={switchToScreen} />
      </div>

      <Separator />

      <div
        id="ten-unused"
        onClick={() => switchToScreen('latest')}
      >
        <span>10 longest inactive tabs</span>
        <GetInBtn />
      </div>

      <Separator />
    </div>
  );
}
