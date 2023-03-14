import { OverviewItem } from "../types";

type MessageType = "items-bookmarked"

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
    case 'items-bookmarked':
      closeTabsInListener(message, closeCb, overviewData);
      break;

    default:
      console.warn('Non-standard message received from background.js:');
      console.warn(message);
      break;
  }
};
