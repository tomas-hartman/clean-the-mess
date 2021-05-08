const closeTabsInListener = (message, closeCb, overviewData) => {
  const { index } = message.data;
  const { ids } = overviewData[index];
  closeCb(ids);
};

const handlePopupListeners = (args) => {
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

export {
  handlePopupListeners,
};
