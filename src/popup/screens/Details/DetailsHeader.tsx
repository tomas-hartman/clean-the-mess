import { VFC } from 'react';
import { CloseAllHeaderBtn, GoBackBtn } from '../../components/Buttons';
import { OverviewItem } from '../../../types';
import { DetailHeader } from '../../components/DetailHeader';
import { CloseTabs, useNavigate } from '../../hooks';

interface DetailsHeaderProps {
  title: string;
  overviewData?: OverviewItem;
  closeTabs: CloseTabs;
}

export const DetailsHeader: VFC<DetailsHeaderProps> = ({ title, overviewData, closeTabs }) => {
  const { switchToScreen } = useNavigate();

  return (
    <DetailHeader>
      <GoBackBtn handleClick={() => switchToScreen('overview')} />
      <div className="header--details-title">
        <div className="favicon header--favicon" style={{ backgroundImage: `url(${overviewData?.favicon})` }} />
        <span>{title}</span>
      </div>
      <CloseAllHeaderBtn
        onClick={() => closeTabs(overviewData?.ids)}
        itemCount={overviewData?.ids && typeof overviewData.ids !== 'number' && overviewData.ids.length}
      />
    </DetailHeader>
  );
};
