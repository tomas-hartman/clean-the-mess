import { FC } from 'react';
import { Separator } from '../../components/Separator';
import { OverviewHeaderItem } from './OverviewHeaderItem';
import { OverviewHeaderUpperItem } from './OverviewHeaderUpperItem';
import { overviewHeaderContainer } from './OverviewHeader.css';
import { useNavigate } from '../../providers';
import { isFirefox } from '../../utils';
import { useData } from '../../hooks';
import { SCREEN } from '../../types';

type OverviewHeaderProps = {
  openTabs: number;
};

export const OverviewHeader: FC<OverviewHeaderProps> = ({ openTabs }) => {
  const { navigate } = useNavigate();
  const { pinned } = useData();

  return (
    <div className={overviewHeaderContainer}>
      <OverviewHeaderUpperItem openTabs={openTabs} navigate={navigate} />
      <Separator />

      {isFirefox() && (
        <OverviewHeaderItem
          icon="BoldClockCounterClockwise"
          onClick={() => navigate(SCREEN.LATEST)}
          label="10 longest inactive tabs"
        />
      )}
      {pinned && (
        <OverviewHeaderItem
          icon="BoldPushPin"
          onClick={() => navigate(SCREEN.DETAILS, { ...pinned, hasActionButton: false })}
          label="Pinned items"
        />
      )}

      {(isFirefox() || pinned) && <Separator />}
    </div>
  );
};
