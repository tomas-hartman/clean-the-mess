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
  const decodedUrl = useMemo(() => (data.url ? decodeURI(data.url) : 'Unknown website'), [data.url]);

  return <DetailedListItemBase data={data} secondaryText={decodedUrl} showFavicon={showFavicon} />;
};

type DetailedListItemBaseProps = LatestListItemProps &
  Pick<ListItemProps, 'secondaryTextTitle'> & {
    secondaryText: string;
  };

export const DetailedListItemBase: FC<DetailedListItemBaseProps> = ({ data, showFavicon, ...props }) => (
  <ListItem
    primaryText={data.title ?? 'Untitled website'}
    initActions={<GetInBtn />}
    favicon={showFavicon ? data.favIconUrl : undefined}
    onClick={() => goToTab(data.id)}
    hoverActions={<DetailedListItemHoverActions data={data} />}
    {...props}
  />
);
