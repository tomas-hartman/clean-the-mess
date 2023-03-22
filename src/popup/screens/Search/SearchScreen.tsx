import { FC, useMemo } from 'react';
import { DetailsItem } from '../../components/DetailItem';
import { useFavicons, useData, useSearch } from '../../hooks';
import { SwitchToScreenType } from '../../Popup';
import { SearchError } from './SearchError';
import { SearchHeader } from './SearchHeader';

type SearchScreenProps = {
  switchToScreen: SwitchToScreenType;
  isActive: boolean;
};

export const SearchScreen: FC<SearchScreenProps> = ({ switchToScreen, isActive }) => {
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
        // oKey={1}
        switchToScreen={switchToScreen}
        foundTabsData={result}
        tabsData={tabs}
        performSearch={search}
        closeTabs={closeTabs}
        isActive={isActive}
      />
      <div className="body-container">
        <ul>{result.length >= 1 ? foundItems : <SearchError />}</ul>
      </div>
    </>
  );
};
