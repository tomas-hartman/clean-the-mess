import { FC, useCallback, useMemo, useState } from 'react';
import { Button } from '../Buttons/Button';
import Browser from 'webextension-polyfill';
import { useData } from '../../hooks';
import { PinnedListItemProps, ListItem } from './ListItem';
import { goToTab } from '../../../_modules';
import { DetailedListItemHoverActions } from './DetailedListItemHoverActions';

export const PinnedListItem: FC<PinnedListItemProps> = ({ data, showFavicon }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { refreshTabs } = useData();

  const decodedUrl = useMemo(() => (data.url ? decodeURI(data.url) : 'Unknown website'), [data.url]);

  const handleUnlock = useCallback(() => {
    setIsUnlocked(true);
  }, []);

  const handleUnpin = useCallback(async () => {
    await Browser.tabs.update(data.id, { pinned: false });
    refreshTabs();
  }, [data.id, refreshTabs]);

  return (
    <ListItem
      primaryText={data.title ?? 'Untitled website'}
      secondaryText={decodedUrl}
      favicon={showFavicon ? data.favIconUrl : undefined}
      onClick={() => goToTab(data.id)}
      hoverActions={
        isUnlocked ? (
          <DetailedListItemHoverActions data={data} />
        ) : (
          <>
            <Button title="Unpin" onClick={handleUnpin} icon="BoldPushPinSlash" size="small" />
            <Button title="Unlock to edit" onClick={handleUnlock} icon="BoldLockOpen" size="small" />
          </>
        )
      }
    />
  );
};
