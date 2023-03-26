import clsx from 'clsx';
import { FC } from 'react';
import { GoBackBtn } from '../../components/Buttons';
import { DetailHeader } from '../../components/DetailHeader';
import { useNavigate } from '../../hooks';
import { latestHeaderTitle } from './LatestHeader.css';

type LatestHeaderProps = {
  title: string;
};

export const LatestHeader: FC<LatestHeaderProps> = ({ title }) => {
  const { switchToScreen } = useNavigate();

  return (
    <DetailHeader>
      <GoBackBtn onClick={() => switchToScreen('overview')} />
      <div className={clsx('header-title', latestHeaderTitle)}>{title}</div>
    </DetailHeader>
  );
};
