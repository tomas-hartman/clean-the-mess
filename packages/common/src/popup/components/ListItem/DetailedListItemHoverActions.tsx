import { FC, useCallback } from 'react';
import { BookmarkCloseBtn, CloseBtn } from '../Buttons';
import { bookmarkTab, hasIgnoredProtocol } from '../../../_modules';
import { Tabs } from 'webextension-polyfill';
import { useData } from '../../hooks';
import { isSafari } from '../../utils';

type DetailedListItemHoverActionsProps = {
  data: Tabs.Tab;
};

export const DetailedListItemHoverActions: FC<DetailedListItemHoverActionsProps> = ({ data }) => {
  const { closeTabs } = useData();

  const bookmarkCloseTab = useCallback(
    (tabData: Tabs.Tab) => {
      bookmarkTab(tabData);
      closeTabs(data.id);
    },
    [closeTabs, data.id],
  );

  const handleCloseTab = useCallback(
    (tId: Tabs.Tab['id']) => {
      tId && closeTabs(tId);
    },
    [closeTabs],
  );

  return (
    <>
      {!isSafari() && !hasIgnoredProtocol(data.url) && (
        <BookmarkCloseBtn tab={data} onClick={() => bookmarkCloseTab(data)} />
      )}
      <CloseBtn onClick={() => handleCloseTab(data.id)} />
    </>
  );
};
