import { Overview, OverviewItem } from '../popup';

type MessageType = "items-bookmarked"

export const ClientEvent = {
  "ITEMS_BOOKMARKED": "items-bookmarked"
} as const

// TODO: improve implementation
export type Listeners = {
  [ClientEvent.ITEMS_BOOKMARKED]: {
    closeCb: () => void;
    overviewData: Overview;
  };
};

type PopupListenersArgs = {
  message: {
    type: MessageType
    data: {
      index: number
    }
  },
  closeCb: (ids?: number[]) => void,
  overviewData: OverviewItem[],
}

const closeTabsInListener = (message: PopupListenersArgs["message"], closeCb: PopupListenersArgs["closeCb"], overviewData: OverviewItem[]) => {
  const { index } = message.data;
  const { ids } = overviewData[index];
  closeCb?.(ids);
};

export const handlePopupListeners = (args: PopupListenersArgs) => {
  const { message, closeCb, overviewData } = args;

  // Finishes bookmark-all event by closing bookmarked items
  switch (message.type) {
    case ClientEvent.ITEMS_BOOKMARKED:
      closeTabsInListener(message, closeCb, overviewData);
      break;

    default:
      console.warn('Non-standard message received from background.js:');
      console.warn(message);
      break;
  }
};
