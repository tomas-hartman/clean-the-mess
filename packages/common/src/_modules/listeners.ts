import browser from 'webextension-polyfill';
import { EnumGuard, ValueOf } from '../../types';
import { BackgroundMessageProps } from '../background';
import { OverviewItem } from '../popup';

type ClientMessageProps = {
  itemsBookmarked: {
    index: number;
  };
};

export const CLIENT_EVENT = {
  ITEMS_BOOKMARKED: 'itemsBookmarked',
} as const satisfies EnumGuard<ClientMessageProps>;

export type ClientEvent = ValueOf<typeof CLIENT_EVENT>;

// TODO: ...data creates spread arg, ie. array! Fix!
export const dispatchBackgroundEvent = <T extends keyof BackgroundMessageProps, D extends BackgroundMessageProps[T]>(
  type: T,
  ...data: D extends null ? [] : [data: BackgroundMessageProps[T]]
) => {
  browser.runtime.sendMessage({ type, data: data[0] });
};

export const dispatchClientEvent = <T extends keyof ClientMessageProps, D extends ClientMessageProps[T]>(
  type: T,
  ...data: D extends null ? [] : [data: ClientMessageProps[T]]
) => {
  browser.runtime.sendMessage({ type, data: data[0] });
};

type PopupListenersPartialArgs<T extends ClientEvent> = {
  type: T;
  data: ClientMessageProps[T];
};

export type CloseTabsInListenerArgs = {
  message: PopupListenersPartialArgs<'itemsBookmarked'>;
  closeCb: (ids?: number[]) => void;
  overviewData: OverviewItem[];
};

const closeTabsInListener = ({ closeCb, message, overviewData }: CloseTabsInListenerArgs) => {
  const { index } = message.data;
  const { ids } = overviewData[index];
  closeCb?.(ids);
};

export const handlePopupListeners = ({ closeCb, message, overviewData }: CloseTabsInListenerArgs) => {
  // Finishes bookmark-all event by closing bookmarked items
  switch (message.type) {
    case CLIENT_EVENT.ITEMS_BOOKMARKED:
      closeTabsInListener({ message, closeCb, overviewData });
      break;

    default:
      console.warn('Non-standard message received from background.js:');
      console.warn(message);
      break;
  }
};
