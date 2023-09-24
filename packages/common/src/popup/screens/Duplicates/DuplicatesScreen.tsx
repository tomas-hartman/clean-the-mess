import { FC } from 'react';
import { useData } from '../../hooks';
import { screenList } from '../Overview/OverviewScreen.css';
import { DetailsHeader } from '../Details/DetailsHeader';
import { DuplicateItem } from '../../components/DuplicateItem';

interface DetailsScreenProps {
  // isActive?: boolean;
  // screen: ScreenProps;
}

export const DuplicatesScreen: FC<DetailsScreenProps> = () => {
  const { duplicates } = useData();
  // const { navigate } = useNavigate();

  // const hasActionButton = screen.options?.hasActionButton ?? true;

  // const details = useMemo(() => getDetailsData(screen, tabs), [screen, tabs]);
  // const overviewItem = useMemo(() => {
  //   if (pinned && pinned?.key === screen.options?.key) {
  //     return pinned;
  //   }

  //   return overview.find(item => item.key === screen.options?.key);
  // }, [overview, pinned, screen.options?.key]);

  // const headerTitle = getHeaderTitle(overviewItem?.url, 'details');

  // const itemCount = overviewItem?.ids && typeof overviewItem.ids !== 'number' ? overviewItem.ids.length : 0;

  // useEffect(() => {
  //   if (isActive && details.length === 0) {
  //     navigate(SCREEN.OVERVIEW);
  //   }
  // }, [details, navigate, isActive]);

  return (
    <>
      <DetailsHeader
        title="Duplicates"
        // overviewData={overviewItem}
        // actionBtn={
        //   hasActionButton && <CloseAllHeaderBtn onClick={() => closeTabs(overviewItem?.ids)} itemCount={itemCount} />
        // }
      />
      <ul className={screenList}>
        {duplicates.map(item => (
          <DuplicateItem data={item} key={item.url} />
        ))}
        {/* {details.map((itemData, i) => (
          <DetailsItem itemId={i} data={itemData} type={type} key={itemData.id} closeTabs={closeTabs} />
        ))} */}
      </ul>
    </>
  );
};
