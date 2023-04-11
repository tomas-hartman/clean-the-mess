import clsx from 'clsx';
import { FC } from 'react';
import { SearchBtn } from '../../components/Buttons';
import { SwitchToScreenType } from '../../providers/RouterProvider';
import { overviewHeaderContent, overviewHeaderMessage, overviewHeaderTitle } from './OverviewHeader.css';

type OverviewHeaderUpperItemProps = {
  openTabs: number;
  switchToScreen: SwitchToScreenType;
};

export const OverviewHeaderUpperItem: FC<OverviewHeaderUpperItemProps> = ({ openTabs, switchToScreen }) => {
  return (
    <div className={clsx(overviewHeaderContent)}>
      <div className={clsx(overviewHeaderTitle)}>
        <span className={clsx(overviewHeaderMessage)}>You have {openTabs ?? 'no'} open tabs in this window.</span>
      </div>
      <SearchBtn onClick={() => switchToScreen('search')} isOverview />
    </div>
  );
};
