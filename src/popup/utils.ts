export const isChrome = () => {
  if (process.env.BROWSER_NAME) {
    return process.env.BROWSER_NAME === 'chrome'
  }

  // Fallback
  return false;
};