import { getOverview } from '../modules/overview.js';

/**
 * Validates if url with given protocol can be bookmarked
 * @param {string} url Url to be validated
 * @returns {boolean}
 */
export const isSupportedProtocol = (url) => {
	const supportedProtocols = ['https:', 'http:', 'ftp:', 'file:'];
	const urlObj = new URL(url);

	return supportedProtocols.indexOf(urlObj.protocol) != -1;
};

/**
 * Checks if url has some of the special protocols, that do not work well with certain features and APIs such as bookmarks
 * @param {string} url 
 * @returns {Boolean}
 */
export const hasIgnoredProtocol = (url) => {
	const ignoredProtocols = ['about:', 'moz-extension:', 'chrome:', 'file:'];
	const { protocol } = new URL(url);

	if(ignoredProtocols.includes(protocol)) {
		return true;
	} else return false;
};

/**
 * Gets information about tab of given id
 * @param {number} id - id from tabs array
 */
export const getTabDataFromId = async (id) => {
	const data = await browser.tabs.get(id);
	const { title, url } = await data;

	return [title, url];
};

// Returns headerTitle for secondary screens
export const getHeaderTitle = (id, type, tabsOverview, count) => {
	let headerTitle = '';

	if (type === 'details') {
		try {
			headerTitle = new URL(tabsOverview[id].url).host;
		} catch (error) {
			if(tabsOverview[id] && tabsOverview[id].url){
				headerTitle = tabsOverview[id].url;
			} else headerTitle = '';
		}
	} else if (type === 'latest') {
		headerTitle = `${count} longest unused tabs`;
	} else headerTitle = null;

	return headerTitle;
};

/**
 * Converts string to html-safe code. Useful for titles to be displayed.
 * @see https://stackoverflow.com/a/57448862/11243775
 * @param {string} str 
 */
export const escapeHTML = str => str.replace(/[&<>'"]/g, 
	tag => ({
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'\'': '&#39;',
		'"': '&quot;'
	}[tag]));

/**
 * Function that calls another one after that one is confirmed
 * @param {string} question enum: bookmarkAll | closeTabs
 * @param {function} onTrue Function wrapped in () => {}
 * @param {function} onFalse Function wrapped in () => {}
 * @param  {...string} args 
 * @todo tests!
 */
export const callWithConfirm = (question, onTrue, onFalse, ...args) => {
	const questions = {
		bookmarkAll:  `Are you sure you want to add ${args[0]} tabs to "${args[1]}" folder in bookmarks and close them?`,
		closeTabs: `Are you sure you want to close ${args[0]} tabs?`
	};

	if(confirm(questions[question])) {
		onTrue();
	} else onFalse();
};

/**
 * Sets number of count into search input info.
 * Manipulates DOM.
 * @todo similar implementation could be used for specifying "not found" error message
 * @param {number} count
 */
export const setFoundCount = (count) => {
	const foundElm = document.querySelector('.search-count');
	if (count > 0) {
		foundElm.innerText = `(${count})`;
	} else foundElm.innerText = '';
};

/**
 * Function that converts string to hash. Used to set unique keys in getOverview.
 * @see https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 * @param {string} value
 * @returns {string} 
 */
export const getHash = (value) => {
	let hash = 0, i, chr;
	for (i = 0; i < value.length; i++) {
		chr = value.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};

/**
 * Function that returns correct overviewData (former tabsOverview) for each window.
 */
export const getOverviewData = async () => {
	const currentWindow = await browser.windows.getCurrent();
	const dataset = `overviewData${currentWindow.id}`;

	const data = await browser.storage.local.get(dataset);

	return data[dataset];
};

const saveTabsOverviewDataPure = async () => {
	const tabs = await browser.tabs.query({ currentWindow: true });
	const currentWindowData = getOverview(await tabs);
	// console.log(await tabs);

	const currentWindow = await browser.windows.getCurrent();
	const overviewData = {};
	overviewData[`overviewData${currentWindow.id}`] = currentWindowData;
	
	await browser.storage.local.set(overviewData);
	console.log('Saved');
};

/**
 * @todo there should be some debounce
 * @param {String} message 
 */
export const saveTabsOverviewData = async (message = null) => {
	if(message) console.log(message);

	setTimeout(async () => {
		await saveTabsOverviewDataPure();
	}, 200);

	/**
	 * TBA: delete this after all
	 */
	const local = await getOverviewData();
	console.log('Local: ', await local);

	const tabs = await browser.tabs.query({ currentWindow: true });
	console.log(await tabs);
	console.log(await tabs.length);
};