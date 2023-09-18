import clsx from 'clsx';
import { FC } from 'react';
import { GetInBtn } from '../../components/Buttons';
import { Navigate } from '../../providers';
import { overviewHeaderLatestItems, overviewHeaderLatestItemsTitle } from './OverviewHeaderLatestItems.css';
import { SCREEN } from '../../types';

export const OverviewHeaderLatestItems: FC<{ navigate: Navigate }> = ({ navigate }) => (
  <div
    className={clsx(overviewHeaderLatestItems)}
    onClick={() => navigate(SCREEN.LATEST)}
    onKeyPress={() => navigate(SCREEN.LATEST)}
    role="link"
    tabIndex={0}
  >
    <span className={clsx(overviewHeaderLatestItemsTitle)}>10 longest inactive tabs</span>
    <GetInBtn />
  </div>
);
