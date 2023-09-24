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

  const handleDeduplicate = useCallback(
    (data: DuplicateGroup) => {
      const ids = data.tabs
        .filter(tab => tab.id !== undefined)
        .map(tab => tab.id || 0)
        .sort((a, b) => a.id - b.id) // TODO
        .slice(1);

      closeTabs(ids);
    },
    [closeTabs],
  );

  return (
    <ListItem
      primaryText={data.url}
      secondaryText={data.title}
      favicon={showFavicon ? data.favicon : undefined}
      extraActionInfo={<span title={`This url is open in ${data.tabs.length} tabs`}>({data.tabs.length})</span>}
      hoverActions={
        <Button
          title="Close duplicate tabs and keep oldest tab"
          onClick={() => handleDeduplicate(data)}
          icon="Remove"
          size="small"
        />
      }
    />
  );
};
