import { VFC } from 'react';
import { CloseAllHeaderBtn, GoBackBtn } from '../../components/Buttons';
import { OverviewItem } from '../../../types';
import { DetailHeader } from '../../components/DetailHeader';
import { CloseTabs, useNavigate } from '../../hooks';
import { detailsHeaderTitle } from './DetailsHeader.css';
import { Favicon } from '../../components/Favicon';

interface DetailsHeaderProps {
  title: string;
  overviewData?: OverviewItem;
  closeTabs: CloseTabs;
}

export const DetailsHeader: VFC<DetailsHeaderProps> = ({ title, overviewData, closeTabs }) => {
  const { switchToScreen } = useNavigate();

  return (
    <DetailHeader>
      <GoBackBtn onClick={() => switchToScreen('overview')} />
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
