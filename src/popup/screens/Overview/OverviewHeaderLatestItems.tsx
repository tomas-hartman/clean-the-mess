import clsx from 'clsx';
import { FC } from 'react';
import { GetInBtn } from '../../components/Buttons';
import { SwitchToScreenType } from '../../providers/RouterProvider';
import { overviewHeaderLatestItems, overviewHeaderLatestItemsTitle } from './OverviewHeaderLatestItems.css';

export const OverviewHeaderLatestItems: FC<{ switchToScreen: SwitchToScreenType }> = ({ switchToScreen }) => (
  <div
    className={clsx(overviewHeaderLatestItems)}
    onClick={() => switchToScreen('latest')}
    onKeyPress={() => switchToScreen('latest')}
    role="link"
    tabIndex={0}
  >
    <span className={clsx(overviewHeaderLatestItemsTitle)}>10 longest inactive tabs</span>
    <GetInBtn />
  </div>
);
