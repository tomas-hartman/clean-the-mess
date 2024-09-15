import { FC, useMemo } from 'react';
import { getFormattedDate, getTimePassed } from '../../../_modules';
import { Tabs } from 'webextension-polyfill';
import { DetailedListItemBase } from './DetailedListItem';

export interface LatestListItemProps {
  data: Tabs.Tab;
  showFavicon: boolean;
}

export const LatestListItem: FC<LatestListItemProps> = ({ data, showFavicon }) => {
  const lastAccessed = data.lastAccessed;

  const [formattedDate, timePassed] = useMemo(() => {
    if (!lastAccessed) {
      return ['', ''];
    }

    return [getFormattedDate(lastAccessed), getTimePassed(lastAccessed)];
  }, [lastAccessed]);

  return (
    <DetailedListItemBase
      data={data}
      secondaryText={timePassed}
      secondaryTextTitle={formattedDate}
      showFavicon={showFavicon}
    />
  );
};
