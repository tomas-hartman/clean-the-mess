import clsx from 'clsx';
import { VFC } from 'react';
import { GetInBtn, SearchBtn } from '../../components/Buttons';
import { detailHeaderContent } from '../../components/DetailHeader.css';
import { Separator } from '../../components/Separator';
import { useNavigate } from '../../hooks';
import { latestHeaderTitle } from '../Latest/LatestHeader.css';
import { overviewHeaderContent, overviewHeaderMessage, overviewHeaderTitle } from './OverviewHeader.css';

type OverviewHeaderProps = {
  openTabs: number;
};

const isChrome = process.env.BROWSER_NAME === 'chrome';

export const OverviewHeader: VFC<OverviewHeaderProps> = ({ openTabs }) => {
  const { switchToScreen } = useNavigate();

  const overviewHeaderSection = (
    <>
      <div id="header" className={clsx('control header-overview', detailHeaderContent, overviewHeaderContent)}>
        <div className={clsx('header-title header-overview-title', overviewHeaderTitle)}>
          <span className={clsx(overviewHeaderMessage)}>
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
