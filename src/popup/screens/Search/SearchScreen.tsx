import { FC, useCallback, useMemo, useState } from 'react';
import { Tabs } from 'webextension-polyfill';
import { search } from '../../../_modules';
import { DetailsItem } from '../../components/DetailItem';
import { useFavicons, useTabs } from '../../hooks';
import { SwitchToScreenType } from '../../Popup';
import { SearchHeader } from './SearchHeader';

type SearchScreenProps = {
  switchToScreen: SwitchToScreenType;
  isActive: boolean;
};

export const SearchScreen: FC<SearchScreenProps> = ({ switchToScreen, isActive }) => {
  const { tabs, closeTabs } = useTabs();
  const showFavicons = useFavicons();
  const [foundTabsData, setFoundTabsData] = useState<Tabs.Tab[]>([]);
  const type = 'url';

  const searchError = (
    <li id="nothing-to-show">
      <div className="item-container error">
        Nothing to display. Either nothing was found or the search hasn&apos;t started yet.
      </div>
    </li>
  );

  const foundItems = useMemo(
    () =>
      foundTabsData.map((item, i) => (
        <DetailsItem
          itemId={i}
          data={item}
          type={type}
          key={item.id}
          closeTabs={closeTabs}
          showFavicon={showFavicons}
        />
      )),
    [closeTabs, foundTabsData, showFavicons],
  );

  const performSearch = useCallback(
    (searchTerm: string) => {
      const result = search.perform(tabs, searchTerm);

      setFoundTabsData(result);
    },
    [tabs],
  );

  return (
    <>
      <SearchHeader
        // oKey={1}
        switchToScreen={switchToScreen}
        foundTabsData={foundTabsData}
        tabsData={tabs}
        performSearch={performSearch}
        closeTabs={closeTabs}
        isActive={isActive}
      />
      <div className="body-container">
        <ul>{foundTabsData.length >= 1 ? foundItems : searchError}</ul>
      </div>
    </>
  );
};
