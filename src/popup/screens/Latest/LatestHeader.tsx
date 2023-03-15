import { FC } from 'react';
import { GoBackBtn } from '../../components/Buttons';
import { DetailHeader } from '../../components/DetailHeader';

type LatestHeaderProps = {
  title: string
  switchToScreen: (e: string) => void
}

export const LatestHeader: FC<LatestHeaderProps> = ({ switchToScreen, title }) => (
  <DetailHeader>
    <GoBackBtn handleClick={() => switchToScreen('overview')} />
    <div className="header-title">{title}</div>
  </DetailHeader>
);
