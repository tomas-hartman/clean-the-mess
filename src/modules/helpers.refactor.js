// Returns headerTitle for secondary screens
const getHeaderTitle = (overviewUrl, type, count) => {
  let headerTitle = '';

  if (type === 'details') {
    try {
      headerTitle = new URL(overviewUrl).host;
    } catch (error) {
      if (overviewUrl) {
        headerTitle = overviewUrl;
      } else headerTitle = '';
    }
  } else if (type === 'latest') {
    headerTitle = `${count} longest unused tabs`;
  } else headerTitle = null;

  return headerTitle;
};

/**
 * Function that calls another one after that one is confirmed
 * @param {string} question enum: bookmarkAll | closeTabs
 * @param {function} onTrue Function wrapped in () => {}
 * @param {function} onFalse Function wrapped in () => {}
 * @param  {...string} args
 * @todo tests!
 */
const callWithConfirm = (question, onTrue, onFalse, ...args) => {
  const questions = {
    bookmarkAll: `Are you sure you want to add ${args[0]} tabs to "${args[1]}" folder in bookmarks and close them?`,
    closeTabs: `Are you sure you want to close ${args[0]} tabs?`,
  };

  if (confirm(questions[question])) {
    onTrue();
    return true;
  }

  onFalse();
  return false;
};

export {
  getHeaderTitle,
  callWithConfirm,
};
