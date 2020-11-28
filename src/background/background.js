import { handleBookmarkAll } from '../modules/bookmarks.js';

/**
 * Listeners to messages from popup.js
 * Popup messages handler. Handles how should be messages from popup.js treated.
 * 
 * @example
 * {
 *   type: "bookmark-all" | "get-overview" | ...
 *   data: {}
 * }
 */
browser.runtime.onMessage.addListener((message) => {
	switch (message.type) {
	case 'bookmark-all':
		handleBookmarkAll(message.data);
		break;
    
	default:
		console.warn('Incorrect message type. Received message:');
		console.log(message);
		break;
	}
});
