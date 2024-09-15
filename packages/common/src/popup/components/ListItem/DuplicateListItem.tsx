import { FC, useCallback } from 'react';
import { DuplicateGroup } from '../../../_modules/duplicates';
import { useData } from '../../hooks';
import { Button } from '../Buttons/Button';
import { ListItem } from './ListItem';
import { Tabs } from 'webextension-polyfill';

const idReducer = (prev: number[], current: Tabs.Tab) => {
  if (current.id) {
    prev.push(current.id);
  }
  return prev;
};

const getAllIds = (tabs: Tabs.Tab[]) => {
  return tabs.reduce(idReducer, []);
};

const getIdsWithoutOldest = (tabs: Tabs.Tab[]) => {
  return tabs
    .sort((a, b) => (!b.id || !a.id ? 0 : a.id - b.id))
    .slice(1)
    .reduce(idReducer, []);
};

const getIdsWithoutPinned = (tabs: Tabs.Tab[], pinnedTabIndex: number) => {
  const firstPinnedTabId = tabs[pinnedTabIndex].id;
  return tabs.filter(tab => tab.id !== firstPinnedTabId).reduce(idReducer, []);
};

interface DuplicateItemProps {
  data: DuplicateGroup;
  showFavicon?: boolean;
}

export const DuplicateListItem: FC<DuplicateItemProps> = ({ data, showFavicon }) => {
  const { closeTabs } = useData();

  const handleDeduplicate = useCallback(() => {
    let ids: number[];

    const pinnedTabIndex = data.tabs.findIndex(tab => tab.pinned);
    if (pinnedTabIndex !== -1) {
      ids = getIdsWithoutPinned(data.tabs, pinnedTabIndex);
    } else {
      ids = getIdsWithoutOldest(data.tabs);
    }

    closeTabs(ids);
  }, [closeTabs, data.tabs]);

  const handleCloseAll = useCallback(() => {
    let ids: number[];

    const pinnedTabIndex = data.tabs.findIndex(tab => tab.pinned);
    if (pinnedTabIndex !== -1) {
      ids = getIdsWithoutPinned(data.tabs, pinnedTabIndex);
    } else {
      ids = getAllIds(data.tabs);
    }

    closeTabs(ids);
  }, [closeTabs, data.tabs]);

  return (
    <ListItem
      primaryText={data.url}
      secondaryText={data.title}
      favicon={showFavicon ? data.favicon : undefined}
      extraActionInfo={<span title={`This url is open in ${data.tabs.length} tabs`}>({data.tabs.length})</span>}
      hoverActions={
        <>
          <Button title="Close all tabs except pinned tabs" onClick={handleCloseAll} icon="CloseAllTabs" size="small" />
          <Button
            title="Close duplicate tabs and keep only the oldest or pinned tab"
            onClick={handleDeduplicate}
            icon="Remove"
            size="small"
          />
        </>
      }
    />
  );
};
