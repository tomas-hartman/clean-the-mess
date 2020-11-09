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

export const getTabDataFromId = async (id) => {
	const data = await browser.tabs.get(id);
	const { title, url } = await data;

	return [title, url];
};