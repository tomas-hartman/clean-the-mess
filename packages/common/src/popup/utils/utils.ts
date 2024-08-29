import { dispatchBackgroundEvent } from '../../_modules';

export const isChrome = () => process.env.BROWSER_NAME === 'chrome';
export const isFirefox = () => process.env.BROWSER_NAME === 'firefox';
export const isSafari = () => process.env.BROWSER_NAME === 'safari';

export const logger = (...data: unknown[]) => {
  dispatchBackgroundEvent('logger', data);
};
