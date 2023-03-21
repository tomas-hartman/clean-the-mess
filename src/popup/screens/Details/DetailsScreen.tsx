import { VFC, useEffect, useMemo } from 'react';
import { Screen } from '../../../types';
import { getDetailsData, getHeaderTitle } from '../../../_modules';
import { SwitchToScreenType } from '../../Popup';
import { DetailsHeader } from './DetailsHeader';
import { DetailsItem } from '../../components/DetailItem';
import { useData } from '../../hooks';

interface DetailsScreenProps {
  switchToScreen: SwitchToScreenType;
  isActive: boolean;
  screen: Screen;
}

export const DetailsScreen: VFC<DetailsScreenProps> = ({ switchToScreen, isActive, screen }) => {
  const { tabs, closeTabs, overview } = useData();

  const details = useMemo(() => getDetailsData(screen, tabs), [screen, tabs]);
  const overviewItem = useMemo(
    () => overview.find(item => item.key === screen.options?.key),
    [overview, screen.options?.key],
  );

  const type = 'url';
  const headerTitle = getHeaderTitle(overviewItem?.url, 'details');

  useEffect(() => {
    if (isActive && details.length === 0) {
      switchToScreen('overview');
    }
  }, [details]);

  return (
    <>
      <DetailsHeader
        title={headerTitle}
        overviewData={overviewItem}
        switchToScreen={switchToScreen}
        closeTabs={closeTabs}
      />
      <div className="body-container">
        <ul>
          {details.map((itemData, i) => (
            <DetailsItem itemId={i} data={itemData} type={type} key={itemData.id} closeTabs={closeTabs} />
          ))}
        </ul>
      </div>
    </>
  );
};
