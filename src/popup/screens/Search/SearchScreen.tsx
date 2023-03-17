import { FC, useCallback, useMemo, useState } from 'react';
import { Tabs } from 'webextension-polyfill';
import { search } from '../../../_modules';
import { DetailsItem } from '../../components/DetailItem';
import { CloseTabs, SwitchToScreenType } from '../../Popup';
import { SearchHeader } from './SearchHeader';

type SearchScreenProps = {
  tabsData: Tabs.Tab[],
  switchToScreen: SwitchToScreenType,
  closeTabs: CloseTabs,
  isActive: boolean,
  showFavicons: boolean
}

export const SearchScreen: FC<SearchScreenProps> = ({ 
  tabsData,
  switchToScreen,
  isActive,
  closeTabs,
  showFavicons 
}) => {
  const [foundTabsData, setFoundTabsData] = useState<Tabs.Tab[]>([]);
  const type = 'url';

  const searchError = (
    <li id="nothing-to-show">
      <div className="item-container error">
        Nothing to display. Either nothing was found or the search hasn&apos;t started yet.
      </div>
    </li>
  );

  const foundItems = useMemo(() => 
    foundTabsData.map((item, i) => (
      <DetailsItem
        itemId={i}
        data={item}
        type={type}
        key={item.id}
        closeTabs={closeTabs}
        showFavicon={showFavicons}
      />
    )), [closeTabs, foundTabsData, showFavicons]);

  const performSearch = useCallback((searchTerm: string) => {
    const result = search.perform(tabsData, searchTerm);

    setFoundTabsData(result);
  }, [tabsData]);

  return (
    <>
      <SearchHeader
        // oKey={1}
        switchToScreen={switchToScreen}
        foundTabsData={foundTabsData}
        tabsData={tabsData}
        performSearch={performSearch}
        closeTabs={closeTabs}
        isActive={isActive}
      />
      <div className="body-container">
        <ul>
          {foundTabsData.length >= 1 ? foundItems : searchError}
        </ul>
      </div>
    </>
  );
};
