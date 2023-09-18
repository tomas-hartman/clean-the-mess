import clsx from 'clsx';
import { FC } from 'react';
import { GoBackBtn } from '../../components/Buttons';
import { DetailHeader } from '../../components/DetailHeader';
import { useNavigate } from '../../providers';
import { latestHeaderTitle } from './LatestHeader.css';
import { SCREEN } from '../../types';

type LatestHeaderProps = {
  title: string;
};

export const LatestHeader: FC<LatestHeaderProps> = ({ title }) => {
  const { navigate } = useNavigate();

  return (
    <DetailHeader>
      <GoBackBtn onClick={() => navigate(SCREEN.OVERVIEW)} />
      <div className={clsx('header-title', latestHeaderTitle)}>{title}</div>
    </DetailHeader>
  );
};
