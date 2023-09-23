import clsx from 'clsx';
import { FC } from 'react';
import { SearchBtn } from '../../components/Buttons';
import { Navigate } from '../../providers';
import { overviewHeaderContent, overviewHeaderMessage, overviewHeaderTitle } from './OverviewHeader.css';
import { SCREEN } from '../../types';

type OverviewHeaderUpperItemProps = {
  openTabs: number;
  navigate: Navigate;
};

export const OverviewHeaderUpperItem: FC<OverviewHeaderUpperItemProps> = ({ openTabs, navigate: switchToScreen }) => (
  <div className={clsx(overviewHeaderContent)}>
    <div className={clsx(overviewHeaderTitle)}>
      <span className={clsx(overviewHeaderMessage)}>You have {openTabs ?? 'no'} open tabs in this window.</span>
    </div>
    <SearchBtn onClick={() => switchToScreen(SCREEN.SEARCH)} isOverview />
  </div>
);
