import { OverviewItem } from '../../types';
import { getHeaderTitle, bookmarkAll } from '../../../_modules';
import { callWithConfirm } from '../../utils';
import { CloseTabs } from '../../providers';

export const bookmarkOverviewTabs = (overviewItem: OverviewItem, oId: number) => {
  const { url, ids } = overviewItem;
  const folderName = getHeaderTitle(url, 'details');

  const onTrue = () => {
    bookmarkAll(overviewItem, oId);
  };

  const onFalse = () => {
    console.log('Nothing invoked.');
  };

  callWithConfirm('bookmarkAll', onTrue, onFalse, `${ids.length}`, folderName);
};

export const closeOverviewTabs = (overviewItem: OverviewItem, closeTabs: CloseTabs) => {
  const { ids } = overviewItem;

  const onFalse = () => {
    console.log('Request to close tabs from overview was declined.');
  };

  if (ids.length > 10) {
    callWithConfirm('closeTabs', () => closeTabs(ids), onFalse, `${ids.length}`);
    return;
  }

  closeTabs(ids);
};
