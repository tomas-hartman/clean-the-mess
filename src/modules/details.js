import { locale } from './locale.js';

/**
 * Function that returns filtered array with details for latest used group
 * @todo Work on detailed and better filtered return array
 * @param {Array} innerTabsData tabs query array
 * @param {Number} numOfLatest optional, is equal to 10 normally
 * @returns {Object[]} Array with filtered items from tabs object
 */
export const getLatestUsed = (innerTabsData, numOfLatest = 10) => {
	let newTabs = innerTabsData.slice(0);
	let iterationsNum = numOfLatest;
	let latest = [];

	if (innerTabsData.length < iterationsNum) iterationsNum = innerTabsData.length;

	newTabs.sort((a, b) => a.lastAccessed - b.lastAccessed);

	for (let i = 0; i < iterationsNum; i++) {
		if (newTabs[i].pinned) continue;

		let output = {};

		const dateToFormat = newTabs[i].lastAccessed ? new Date(newTabs[i].lastAccessed) : new Date();
		let date = new Intl.DateTimeFormat(locale.string, locale.options).format(dateToFormat);

		output.date = date;
		output.title = newTabs[i].title;
		output.id = newTabs[i].id;
		output.url = newTabs[i].url;

		latest.push(output);
	}

	return latest;
};

/**
 * Function that returns filtered array with details for given group
 * @param {Object} overviewItemData data of one given item in overviewData
 * @param {Object} innerTabsData tabsData object
 * @returns {Object[]}
 */
export const getDetailsArray = (overviewItemData, innerTabsData) => {
	const ids = overviewItemData.ids;
	let array = [];

	for (let i = 0; i < ids.length; i++) {
		array.push(...innerTabsData.filter((tab) => tab.id === ids[i]));
	}

	array.sort((a, b) => b.lastAccessed - a.lastAccessed);

	return array;
};

/**
 * Function that returns filtered array with details for current search query
 * @param {Object[]} innerTabsData 
 * @returns {Object[]} - Array of found items
 */
export const getSearchDetailsArray = (innerTabsData) => {
	const newTabs = innerTabsData.slice(0);
	const foundItems = [];

	/* 
	For each item from data create an object with:
	{ id, url, title, date}

	and sort them by date

	if data = [], then return null or stg
	*/

	for (let i = 0; i < innerTabsData.length; i++) {
		if (newTabs[i].pinned) continue;

		let output = {};

		const dateToFormat = newTabs[i].lastAccessed ? new Date(newTabs[i].lastAccessed) : new Date();
		let date = new Intl.DateTimeFormat(locale.string, locale.options).format(dateToFormat);

		output.date = date;
		output.title = newTabs[i].title;
		output.id = newTabs[i].id;
		output.url = newTabs[i].url;

		foundItems.push(output);
	}

	// sort the results by date or relevancy?

	console.log(foundItems);

	return foundItems;
};

/**
 * Function that utilizes data grouping methods and returns their pre-made output.
 * Returns sorted/reduced array for detailed secondary screens
 * Detailed array consists of objects with props {id, url, title, date}
 *
 * @param {String} type normal | latest | ???
 * @param {Array} innerOverviewData - copy of dataOverview object for reference
 * @param {Object} props - object with optional settings
 * @param {Number} props.count
 * @param {Number} props.index 
 * @param {Object} props.data tabsData object
 * @returns {Object[]} = [{id, url, title, date}, ...]
 */
const getDetailedArray = (type, innerOverviewData, props = {}) => {
	let { count, index, data } = props;

	let array = [];
	if (type === 'details' && data) { // data === __tabs__
		array = getDetailsArray(innerOverviewData[index], data);
	} else if (type === 'latest' && count && data) {
		array = getLatestUsed(data, count);
	} else if (type === 'search' && data) {
		array = getSearchDetailsArray(data);
	} else {
		console.log('Error: got wrong params on getDetailedArray()');
	}

	return array;
};

export default getDetailedArray;