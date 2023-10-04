import { FC, useMemo } from 'react';
import { GetInBtn } from '../Buttons';
import { goToTab } from '../../../_modules';
import { Tabs } from 'webextension-polyfill';
import { ListItem, ListItemProps } from './ListItem';
import { DetailedListItemHoverActions } from './DetailedListItemHoverActions';
import { LatestListItemProps } from './LatestListItem';

interface DetailListItemProps {
  data: Tabs.Tab;
  showFavicon?: boolean;
}

export const DetailListItem: FC<DetailListItemProps> = ({ data, showFavicon = false }) => {
  const decodedUrl = useMemo(() => (data.url ? decodeURI(data.url) : ''), [data.url]);

  return <DetailedListItemBase data={data} secondaryText={decodedUrl} showFavicon={showFavicon} />;
};

type DetailedListItemBaseProps = LatestListItemProps &
  Pick<ListItemProps, 'secondaryTextTitle'> & {
    secondaryText: string;
  };

const getPrimaryText = (data: Tabs.Tab) => {
  if (!data.title && !data.url) return 'Empty tab';

  return data.title ?? 'Untitled website';
};

export const DetailedListItemBase: FC<DetailedListItemBaseProps> = ({ data, showFavicon, ...props }) => (
  <ListItem
    primaryText={getPrimaryText(data)}
    initActions={<GetInBtn />}
    favicon={showFavicon ? data.favIconUrl : undefined}
    onClick={() => goToTab(data.id)}
    hoverActions={<DetailedListItemHoverActions data={data} />}
    {...props}
  />
);
