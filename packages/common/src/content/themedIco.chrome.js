import { dispatchBackgroundEvent } from '../_modules';
import { BACKGROUND_EVENT } from '../background';

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // chrome.runtime.sendMessage({ type: BACKGROUND_EVENT.DARK_SCHEME });
  dispatchBackgroundEvent(BACKGROUND_EVENT.DARK_SCHEME);
}
