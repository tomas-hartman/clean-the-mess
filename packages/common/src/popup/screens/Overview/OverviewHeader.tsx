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
  const { pinned, duplicates } = useData();

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
          onClick={() => navigate(SCREEN.DETAILS, { ...pinned, hasActionButton: false, isPinned: true })}
          label="Pinned items"
        />
      )}
      {duplicates.length > 0 && (
        <OverviewHeaderItem icon="BoldFolders" onClick={() => navigate(SCREEN.DUPLICATES)} label="Duplicated tabs" />
      )}

      {(isFirefox() || pinned || duplicates.length > 0) && <Separator />}
    </div>
  );
};
