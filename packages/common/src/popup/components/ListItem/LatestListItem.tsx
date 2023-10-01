import { FC, useMemo } from 'react';
import { getFormatedDate, getTimePassed } from '../../../_modules';
import { Tabs } from 'webextension-polyfill';
import { DetailedListItemBase } from './DetailedListItem';

export interface LatestListItemProps {
  data: Tabs.Tab;
  showFavicon: boolean;
}

export const LatestListItem: FC<LatestListItemProps> = ({ data, showFavicon }) => {
  const lastAccessed = data.lastAccessed;

  const [formatedDate, timePassed] = useMemo(() => {
    if (!lastAccessed) {
      return ['', ''];
    }

    return [getFormatedDate(lastAccessed), getTimePassed(lastAccessed)];
  }, [lastAccessed]);

  return (
    <DetailedListItemBase
      data={data}
      secondaryText={timePassed}
      secondaryTextTitle={formatedDate}
      showFavicon={showFavicon}
    />
  );
};
