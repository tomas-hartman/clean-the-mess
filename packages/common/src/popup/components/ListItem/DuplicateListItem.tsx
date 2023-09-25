import { FC, useCallback } from 'react';
import { DuplicateGroup } from '../../../_modules/duplicates';
import { useData } from '../../hooks';
import { Button } from '../Buttons/Button';
import { ListItem } from './ListItem';

interface DuplicateItemProps {
  data: DuplicateGroup;
  showFavicon?: boolean;
}

export const DuplicateListItem: FC<DuplicateItemProps> = ({ data, showFavicon }) => {
  const { closeTabs } = useData();

  const handleDeduplicate = useCallback(() => {
    const pinnedTab = data.tabs.findIndex(tab => tab.pinned);

    if (pinnedTab !== -1) {
      data.tabs.splice(pinnedTab, 1);

      const ids = data.tabs.reduce((prev: number[], current) => {
        if (current.id) {
          prev.push(current.id);
        }
        return prev;
      }, []);

      closeTabs(ids);
      return;
    }

    const ids = data.tabs
      .sort((a, b) => (!b.id || !a.id ? 0 : a.id - b.id))
      .slice(1)
      .reduce((prev: number[], current) => {
        if (current.id) {
          prev.push(current.id);
        }
        return prev;
      }, []);
    closeTabs(ids);
  }, [closeTabs, data.tabs]);

  return (
    <ListItem
      primaryText={data.url}
      secondaryText={data.title}
      favicon={showFavicon ? data.favicon : undefined}
      extraActionInfo={<span title={`This url is open in ${data.tabs.length} tabs`}>({data.tabs.length})</span>}
      hoverActions={
        <Button
          title="Close duplicate tabs and keep only the oldest or pinned tab"
          onClick={handleDeduplicate}
          icon="Remove"
          size="small"
        />
      }
    />
  );
};
