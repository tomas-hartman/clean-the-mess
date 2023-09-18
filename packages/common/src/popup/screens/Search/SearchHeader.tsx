import { FC, useEffect, useRef } from 'react';
import { Tabs } from 'webextension-polyfill';
import { CloseAllHeaderBtn, GoBackBtn } from '../../components/Buttons';
import { DetailHeader } from '../../components/DetailHeader';
import { CloseTabs } from '../../hooks';
import { searchContainer, searchControls, searchInput } from './SearchHeader.css';
import clsx from 'clsx';
import { useNavigate } from '../../providers';
import { SCREEN } from '../../types';

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
  const { navigate } = useNavigate();

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
    <DetailHeader>
      <GoBackBtn onClick={() => navigate(SCREEN.OVERVIEW)} />
      <div className={clsx('search-container', searchContainer)}>
        <input
          type="search"
          name="search-input"
          className={searchInput}
          placeholder="Type here"
          ref={searchRef}
          onKeyUp={item => performSearch(item.currentTarget.value)}
        />
        <div className={searchControls}>
          <span className="search-count">{`(${searchCount})`}</span>
        </div>
      </div>
      <CloseAllHeaderBtn onClick={() => closeTabs(ids)} itemCount={ids.length} />
    </DetailHeader>
  );
};
