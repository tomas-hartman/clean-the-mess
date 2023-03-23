import { VFC } from 'react';
import { GetInBtn, SearchBtn } from '../../components/Buttons';
import { Separator } from '../../components/Separator';
import { useNavigate } from '../../hooks';

type OverviewHeaderProps = {
  openTabs: number;
};

export const OverviewHeader: VFC<OverviewHeaderProps> = ({ openTabs }) => {
  const { switchToScreen } = useNavigate();
  const isChrome = process.env.BROWSER_NAME === 'chrome';

  const overviewHeaderSection = (
    <>
      <div id="header" className="control header-overview">
        <div className="header-title header-overview-title">
          <span>
            You have <span id="open-tabs-count">{openTabs}</span> open tabs in this window.
          </span>
        </div>
        <SearchBtn switchToScreen={switchToScreen} style={{ justifySelf: 'end' }} />
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
