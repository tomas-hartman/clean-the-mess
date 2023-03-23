import { FC, useEffect, useRef } from 'react';
import { Tabs } from 'webextension-polyfill';
import { CloseAllHeaderBtn, GoBackBtn } from '../../components/Buttons';
import { Separator } from '../../components/Separator';
import { CloseTabs, useNavigate } from '../../hooks';

interface SearchHeaderProps {
  foundTabsData: Tabs.Tab[];
  performSearch: (searchTerm: string) => void;
  isActive: boolean;
  closeTabs: CloseTabs;
  tabsData: Tabs.Tab[];
}

export const SearchHeader: FC<SearchHeaderProps> = ({
  foundTabsData,
  performSearch,
  isActive,
  closeTabs,
  tabsData,
}) => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const { switchToScreen } = useNavigate();

  const searchCount = foundTabsData.length;
  const ids = foundTabsData.filter((item): item is Required<Tabs.Tab> => item.id !== undefined).map(item => item.id);

  useEffect(() => {
    if (searchRef.current && isActive) {
      const setFocusOnSearchBar = () => {
        searchRef.current?.focus();
        searchRef.current?.select();
      };

      // This must invoke after the transition!
      setTimeout(setFocusOnSearchBar, 100);
    }
  }, [searchRef, isActive]);

  // Re-fires search after tabsData changes
  useEffect(() => {
    if (searchRef.current && isActive) {
      performSearch(searchRef.current.value);
    }
  }, [tabsData, searchRef, isActive, performSearch]);

  return (
    <div className="header-container">
      <div id="header" className="control">
        <GoBackBtn handleClick={() => switchToScreen('overview')} />
        <div className="header-title">
          <div className="search-container">
            <input
              type="search"
              name="search-input"
              id="search-input"
              placeholder="Type here"
              ref={searchRef}
              onKeyUp={item => performSearch(item.currentTarget.value)}
            />
            <div className="search-controls">
              <span className="search-count">{`(${searchCount})`}</span>
              <button type="button" className="clear-search hidden">
                x
              </button>
            </div>
          </div>
        </div>
        <CloseAllHeaderBtn onClick={() => closeTabs(ids)} itemCount={ids.length} />
      </div>
      <Separator />
    </div>
  );
};
