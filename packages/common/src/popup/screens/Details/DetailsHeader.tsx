import { FC, ReactNode } from 'react';
import { GoBackBtn } from '../../components/Buttons';
import { OverviewItem, SCREEN } from '../../types';
import { DetailHeader } from '../../components/DetailHeader';
import { detailsHeaderTitle } from './DetailsHeader.css';
import { Favicon } from '../../components/Favicon';
import { useNavigate } from '../../providers';

interface DetailsHeaderProps {
  title: string;
  overviewData?: OverviewItem;
  actionBtn?: ReactNode;
}

export const DetailsHeader: FC<DetailsHeaderProps> = ({ title, overviewData, actionBtn }) => {
  const { navigate } = useNavigate();

  return (
    <DetailHeader>
      <GoBackBtn onClick={() => navigate(SCREEN.OVERVIEW)} />
      <div className={detailsHeaderTitle}>
        <Favicon src={overviewData?.favicon} />
        <span>{title}</span>
      </div>
      {actionBtn}
    </DetailHeader>
  );
};
