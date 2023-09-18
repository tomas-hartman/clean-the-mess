import { FC } from 'react';
import { CloseAllHeaderBtn, GoBackBtn } from '../../components/Buttons';
import { OverviewItem, SCREEN } from '../../types';
import { DetailHeader } from '../../components/DetailHeader';
import { CloseTabs } from '../../hooks';
import { detailsHeaderTitle } from './DetailsHeader.css';
import { Favicon } from '../../components/Favicon';
import { useNavigate } from '../../providers';

interface DetailsHeaderProps {
  title: string;
  overviewData?: OverviewItem;
  closeTabs: CloseTabs;
}

export const DetailsHeader: FC<DetailsHeaderProps> = ({ title, overviewData, closeTabs }) => {
  const { navigate } = useNavigate();

  return (
    <DetailHeader>
      <GoBackBtn onClick={() => navigate(SCREEN.OVERVIEW)} />
      <div className={detailsHeaderTitle}>
        <Favicon src={overviewData?.favicon} />
        <span>{title}</span>
      </div>
      <CloseAllHeaderBtn
        onClick={() => closeTabs(overviewData?.ids)}
        itemCount={overviewData?.ids && typeof overviewData.ids !== 'number' && overviewData.ids.length}
      />
    </DetailHeader>
  );
};
