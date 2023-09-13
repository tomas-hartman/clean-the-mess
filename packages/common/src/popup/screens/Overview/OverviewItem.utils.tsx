import { OverviewItem as OverviewItemType } from '../../../types';
import { getHeaderTitle, callWithConfirm, bookmarkAll } from '../../../_modules';
import { CloseTabs } from '../../Popup';

export const bookmarkOverviewTabs = (overviewObject: OverviewItemType, oId: number) => {
  const { url, count } = overviewObject;
  const folderName = getHeaderTitle(url, 'details');

  const onTrue = () => {
    bookmarkAll(overviewObject, oId);
  };

  const onFalse = () => {
    console.log('Nothing invoked.');
  };

  callWithConfirm('bookmarkAll', onTrue, onFalse, `${count}`, folderName);
};

export const closeOverviewTabs = (overviewObject: OverviewItemType, closeTabs: CloseTabs) => {
  const { ids, count } = overviewObject;

  const onFalse = () => {
    console.log('Request to close tabs from overview was declined.');
  };

  if (count > 10) {
    callWithConfirm('closeTabs', () => closeTabs(ids), onFalse, `${count}`);
    return;
  }

  closeTabs(ids);
};