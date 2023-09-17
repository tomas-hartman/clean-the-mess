import { BackgroundEvent } from '../background/background';

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  chrome.runtime.sendMessage({ type: BackgroundEvent.DARK_SCHEME });
}
