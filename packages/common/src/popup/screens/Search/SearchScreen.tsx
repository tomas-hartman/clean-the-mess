import { FC, useMemo } from 'react';
import { DetailsItem } from '../../components/DetailItem';
import { useFavicons, useData, useSearch } from '../../hooks';
import { screenList } from '../Overview/OverviewScreen.css';
import { SearchError } from './SearchError';
import { SearchHeader } from './SearchHeader';

type SearchScreenProps = {
  isActive: boolean;
};

export const SearchScreen: FC<SearchScreenProps> = ({ isActive }) => {
  const { tabs, closeTabs } = useData();
  const { search, result } = useSearch({ tabs });

  const showFavicons = useFavicons();
  const type = 'url';

  const foundItems = useMemo(
    () =>
      result.map((item, i) => (
        <DetailsItem
          itemId={i}
          data={item}
          type={type}
          key={item.id}
          closeTabs={closeTabs}
          showFavicon={showFavicons}
        />
      )),
    [closeTabs, result, showFavicons],
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
