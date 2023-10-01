import { FC, useEffect, useMemo } from 'react';
import { SCREEN, ScreenProps } from '../../types';
import { getDetailsData, getHeaderTitle } from '../../../_modules';
import { DetailsHeader } from './DetailsHeader';
import { useData, useFavicons } from '../../hooks';
import { screenList } from '../Overview/OverviewScreen.css';
import { useNavigate } from '../../providers';
import { CloseAllHeaderBtn } from '../../components/Buttons';
import { DetailListItem, PinnedListItem } from '../../components';

interface DetailsScreenProps {
  isActive: boolean;
  screen: ScreenProps;
}

export const DetailsScreen: FC<DetailsScreenProps> = ({ isActive, screen }) => {
  const { tabs, closeTabs, overview, pinned } = useData();
  const { navigate } = useNavigate();
  const showFavicon = useFavicons();

  const hasActionButton = screen.options?.hasActionButton ?? true;
  const isPinnedScreen = screen.options?.isPinned ?? false;

  const details = useMemo(() => getDetailsData(screen, tabs), [screen, tabs]);
  const overviewItem = useMemo(() => {
    if (pinned && pinned?.key === screen.options?.key) {
      return pinned;
    }

    return overview.find(item => item.key === screen.options?.key);
  }, [overview, pinned, screen.options?.key]);

  const headerTitle = getHeaderTitle(overviewItem?.url, 'details');

  const itemCount = overviewItem?.ids && typeof overviewItem.ids !== 'number' ? overviewItem.ids.length : 0;

  useEffect(() => {
    if (isActive && details.length === 0) {
      navigate(SCREEN.OVERVIEW);
    }
  }, [details, navigate, isActive]);

  return (
    <>
      <DetailsHeader
        title={headerTitle}
        overviewData={overviewItem}
        actionBtn={
          hasActionButton && <CloseAllHeaderBtn onClick={() => closeTabs(overviewItem?.ids)} itemCount={itemCount} />
        }
      />
      <ul className={screenList}>
        {details.map(data =>
          isPinnedScreen ? (
            <PinnedListItem data={data} key={data.id} showFavicon={showFavicon} />
          ) : (
            <DetailListItem data={data} key={data.id} />
          ),
        )}
      </ul>
    </>
  );
};
