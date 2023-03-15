import { VFC } from 'react';
import { SwitchToScreenType } from '../../Popup';
import { GetInBtn, SearchBtn } from '../../Components/Buttons';
import { Separator } from '../../Components/Separator';

type OverviewHeaderProps = {
  switchToScreen: SwitchToScreenType,
  openTabs: number
};

export const OverviewHeader: VFC<OverviewHeaderProps> = ({ switchToScreen, openTabs }) => {
  const isChrome = process.env.BROWSER_NAME === 'chrome';

  const overviewHeaderSection = (
    <>
      <div id="header" className="control header-overview">
        <div className="header-title header-overview-title">
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
    </>
  );

  const latestSection = (
    <>
      <div
        id="ten-unused"
        onClick={() => switchToScreen('latest')}
        onKeyPress={() => switchToScreen('latest')}
        role="link"
        tabIndex={0}
      >
        <span>10 longest inactive tabs</span>
        <GetInBtn />
      </div>

      <Separator />
    </>
  );

  return (
    <div className="header-container">
      {overviewHeaderSection}
      {!isChrome && latestSection}
    </div>
  );
};
