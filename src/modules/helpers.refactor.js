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

export {
  getHeaderTitle,
};
