import { FC, useMemo } from 'react';
import { GetInBtn } from '../Buttons';
import { getFormatedDate, goToTab } from '../../../_modules';
import { Tabs } from 'webextension-polyfill';
import { ListItem } from './ListItem';
import { DetailedListItemHoverActions } from './DetailedListItemHoverActions';

interface DetailListItemProps {
  data: Tabs.Tab;
  showFavicon?: boolean;
}

export const LatestListItem: FC<DetailListItemProps> = ({ data }) => {
  const date = useMemo(() => getFormatedDate(data.lastAccessed) || '', [data.lastAccessed]);

  return <DetailedListItemBase data={data} secondaryText={date} showFavicon={true} />;
};

export const DetailListItem: FC<DetailListItemProps> = ({ data, showFavicon = false }) => {
  const decodedUrl = useMemo(() => (data.url ? decodeURI(data.url) : 'Unknown website'), [data.url]);

  return <DetailedListItemBase data={data} secondaryText={decodedUrl} showFavicon={showFavicon} />;
};

type DetailedListItemBaseProps = DetailListItemProps & {
  showFavicon: boolean;
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
