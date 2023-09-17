import browser from 'webextension-polyfill';
import { AssertEnumMatch, ValueOf } from '../../types';
import { BackgroundMessage } from '../background';
import { Overview } from '../popup';

export const CLIENT_EVENT = {
  "ITEMS_BOOKMARKED": "items-bookmarked",
} as const

export type ClientEvent = ValueOf<typeof CLIENT_EVENT>

type ClientMessage = AssertEnumMatch<typeof CLIENT_EVENT, {
  [CLIENT_EVENT.ITEMS_BOOKMARKED]: {
    index: number
  };
}>

// TODO: ...data creates spread arg, ie. array! Fix!
export const dispatchBackgroundEvent = <T extends keyof BackgroundMessage, D extends BackgroundMessage[T]>(type: T, ...data: (D extends null ? [] : [data: BackgroundMessage[T]])) => {
  browser.runtime.sendMessage({ type, data: data[0] });
}

export const dispatchClientEvent = <T extends keyof ClientMessage, D extends ClientMessage[T]>(type: T, ...data: (D extends null ? [] : [data: ClientMessage[T]])) => {
  browser.runtime.sendMessage({ type, data: data[0] });
}

type PopupListenersPartialArgs<T extends ClientEvent> = {
  type: T,
  data: ClientMessage[T]
}

export type CloseTabsInListenerArgs = {
  message: PopupListenersPartialArgs<"items-bookmarked">,
  closeCb: (ids?: number[]) => void,
  overviewData: Overview,
}

const closeTabsInListener = ({ closeCb, message, overviewData }: CloseTabsInListenerArgs) => {
  const { index } = message.data
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
