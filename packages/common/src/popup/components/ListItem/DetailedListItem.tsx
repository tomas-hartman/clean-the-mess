import { FC, useMemo } from 'react';
import { GetInBtn } from '../Buttons';
import { getFormatedDate, goToTab } from '../../../_modules';
import { Tabs } from 'webextension-polyfill';
import { ListItem } from './ListItem';
import { DetailedListItemHoverActions } from './DetailedListItemHoverActions';

interface LatestListItemProps {
  data: Tabs.Tab;
  showFavicon: boolean;
}

export const LatestListItem: FC<LatestListItemProps> = ({ data, showFavicon }) => {
  const date = useMemo(() => getFormatedDate(data.lastAccessed) || '', [data.lastAccessed]);

  return <DetailedListItemBase data={data} secondaryText={date} showFavicon={showFavicon} />;
};

interface DetailListItemProps {
  data: Tabs.Tab;
  showFavicon?: boolean;
}

export const DetailListItem: FC<DetailListItemProps> = ({ data, showFavicon = false }) => {
  const decodedUrl = useMemo(() => (data.url ? decodeURI(data.url) : 'Unknown website'), [data.url]);

  return <DetailedListItemBase data={data} secondaryText={decodedUrl} showFavicon={showFavicon} />;
};

type DetailedListItemBaseProps = LatestListItemProps & {
  secondaryText: string;
};

export const DetailedListItemBase: FC<DetailedListItemBaseProps> = ({ data, showFavicon, secondaryText }) => (
  <ListItem
    primaryText={data.title ?? 'Untitled website'}
    secondaryText={secondaryText}
    initActions={<GetInBtn />}
    favicon={showFavicon ? data.favIconUrl : undefined}
    onClick={() => goToTab(data.id)}
    hoverActions={<DetailedListItemHoverActions data={data} />}
  />
);
