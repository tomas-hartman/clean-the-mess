import { VFC } from 'react';
import { Separator } from '../../components/Separator';
import { useNavigate } from '../../hooks';
import { OverviewHeaderLatestItems } from './OverviewHeaderLatestItems';
import { OverviewHeaderUpperItem } from './OverviewHeaderUpperItem';
import { overviewHeaderContainer } from './OverviewHeader.css';

type OverviewHeaderProps = {
  openTabs: number;
};

const isChrome = process.env.BROWSER_NAME === 'chrome';

export const OverviewHeader: VFC<OverviewHeaderProps> = ({ openTabs }) => {
  const { switchToScreen } = useNavigate();

  return (
    <div className={overviewHeaderContainer}>
      <OverviewHeaderUpperItem openTabs={openTabs} switchToScreen={switchToScreen} />
      <Separator />
      {!isChrome && <OverviewHeaderLatestItems switchToScreen={switchToScreen} />}
      <Separator />
    </div>
  );
};
