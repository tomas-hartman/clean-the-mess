import { VFC } from 'react';
import { CloseAllHeaderBtn, GoBackBtn } from '../../Components/Buttons';
import { CloseTabs, SwitchToScreenType } from '../../Popup';
import { OverviewItem } from '../../../types';
import { DetailHeader } from '../../Components/DetailHeader';

interface DetailsHeaderProps {
  title: string,
  switchToScreen: SwitchToScreenType,
  overviewData?: OverviewItem,
  closeTabs: CloseTabs,
}

export const DetailsHeader: VFC<DetailsHeaderProps> = ({ title, switchToScreen, overviewData, closeTabs }) => {
  return (
    <DetailHeader>
      <GoBackBtn handleClick={() => switchToScreen('overview')} />
      <div className="header--details-title">
        <div className="favicon header--favicon" style={{ backgroundImage: `url(${overviewData?.favicon})` }} />
        <span>{title}</span>
      </div>
      <CloseAllHeaderBtn
        onClick={() => closeTabs(overviewData?.ids)}
        itemCount={overviewData?.ids && typeof overviewData.ids !== "number" && overviewData.ids.length}
      />
    </DetailHeader>
  );
};
