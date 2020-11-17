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