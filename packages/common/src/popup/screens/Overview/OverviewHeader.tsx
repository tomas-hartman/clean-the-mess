import { FC } from 'react';
import { Separator } from '../../components/Separator';
import { OverviewHeaderLatestItems } from './OverviewHeaderLatestItems';
import { OverviewHeaderUpperItem } from './OverviewHeaderUpperItem';
import { overviewHeaderContainer } from './OverviewHeader.css';
import { useNavigate } from '../../providers';
import { isFirefox } from '../../utils';

type OverviewHeaderProps = {
  openTabs: number;
};

export const OverviewHeader: FC<OverviewHeaderProps> = ({ openTabs }) => {
  const { navigate } = useNavigate();

  return (
    <div className={overviewHeaderContainer}>
      <OverviewHeaderUpperItem openTabs={openTabs} navigate={navigate} />
      <Separator />
      {isFirefox() && (
        <>
          <OverviewHeaderLatestItems navigate={navigate} />
          <Separator />
        </>
      )}
    </div>
  );
};
