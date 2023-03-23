import { FC } from 'react';
import { GoBackBtn } from '../../components/Buttons';
import { DetailHeader } from '../../components/DetailHeader';
import { useNavigate } from '../../hooks';

type LatestHeaderProps = {
  title: string;
};

export const LatestHeader: FC<LatestHeaderProps> = ({ title }) => {
  const { switchToScreen } = useNavigate();

  return (
    <DetailHeader>
      <GoBackBtn handleClick={() => switchToScreen('overview')} />
      <div className="header-title">{title}</div>
    </DetailHeader>
  );
};
