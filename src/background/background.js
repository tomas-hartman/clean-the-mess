import { handleBookmarkAll } from '../modules/bookmarks.js';
import { saveTabsOverviewData } from '../modules/helpers.js';

/**
 * This handles "overviewData"
 */
browser.runtime.onStartup.addListener(async () => {
	await saveTabsOverviewData('Initial');
});

browser.runtime.onInstalled.addListener(async () => {
	await saveTabsOverviewData('Installed');
});

browser.tabs.onActivated.addListener(async () => {
	await saveTabsOverviewData('Activated');
});

browser.tabs.onCreated.addListener(async (tab) => {
	console.log(tab); // can be useful in some way, but unneccessary now
	await saveTabsOverviewData('Created');
});

/** Only checks when status is changing (load, reload etc) */
browser.tabs.onUpdated.addListener(async () => {
	await saveTabsOverviewData('Updated!');
}, { properties: ['status']});

browser.tabs.onRemoved.addListener(async (deleted, _removeInfo) => {
	await saveTabsOverviewData(`Removed ${deleted}`);
});

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
