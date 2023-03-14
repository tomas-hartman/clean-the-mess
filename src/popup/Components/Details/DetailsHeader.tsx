import React, { VFC } from 'react';
import { Separator } from '../Separator';
import { CloseAllHeaderBtn, GoBackBtn } from '../Buttons';
import { CloseTabs, SwitchToScreenType } from '../../Popup';
import { OverviewItem } from '../../../types';

interface DetailsHeaderProps {
  title: string,
  switchToScreen: SwitchToScreenType,
  overviewData?: OverviewItem,
  closeTabs: CloseTabs,
}

export const DetailsHeader: VFC<DetailsHeaderProps> = ({title, switchToScreen, overviewData, closeTabs}) => {
  return (
    <div className="header-container">
      <div id="header" className="control">
        <GoBackBtn handleClick={() => switchToScreen('overview')} />
        <div className="header--details-title">
          <div className="favicon header--favicon" style={{ backgroundImage: `url(${overviewData?.favicon})` }} />
          <span>{title}</span>
        </div>
        <CloseAllHeaderBtn
          onClick={() => closeTabs(overviewData?.ids)}
          itemCount={overviewData?.ids && typeof overviewData.ids !== "number" && overviewData.ids.length}
          />
      </div>
      <Separator />
    </div>
  );
};
