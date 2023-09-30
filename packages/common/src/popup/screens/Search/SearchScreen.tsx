import { FC, useMemo } from 'react';
import { useFavicons, useData, useSearch } from '../../hooks';
import { screenList } from '../Overview/OverviewScreen.css';
import { SearchError } from './SearchError';
import { SearchHeader } from './SearchHeader';
import { DetailListItem } from '../../components';

type SearchScreenProps = {
  isActive: boolean;
};

export const SearchScreen: FC<SearchScreenProps> = ({ isActive }) => {
  const { tabs, closeTabs } = useData();
  const { search, result } = useSearch({ tabs });

  const showFavicon = useFavicons();

  const foundItems = useMemo(
    () => result.map(item => <DetailListItem data={item} key={item.id} showFavicon={showFavicon} />),
    [result, showFavicon],
  );

  return (
    <>
      <SearchHeader
        foundTabsData={result}
        tabsData={tabs}
        performSearch={search}
        closeTabs={closeTabs}
        isActive={isActive}
      />
      <ul className={screenList}>{result.length >= 1 ? foundItems : <SearchError />}</ul>
    </>
  );
};
