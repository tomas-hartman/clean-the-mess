import { locale } from './locale.js';

/**
 * Function that returns filtered array with details for latest used group
 * @todo Work on detailed and better filtered return array
 * @param {array} tabs tabs query array
 * @param {number} numOfLatest optional, is equal to 10 normally
 * @returns {Object[]} Array with filtered items from tabs object
 */
export const getLatestUsed = (tabs, numOfLatest = 10) => {
	let newTabs = tabs.slice(0);
	let iterationsNum = numOfLatest;
	let latest = [];

	if (tabs.length < iterationsNum) iterationsNum = tabs.length;

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
 * @param {*} overviewId 
 * @param {*} tabsOverview 
 * @param {*} data 
 */
export const getDetailsArray = (overviewId, tabsOverview, data) => {
	const ids = tabsOverview[overviewId].ids;
	let array = [];

	for (let i = 0; i < ids.length; i++) {
		array.push(...data.filter((tab) => tab.id === ids[i]));
	}

	array.sort((a, b) => b.lastAccessed - a.lastAccessed);

	return array;
};

/**
 * Function that returns filtered array with details for current search query
 * @param {*} data 
 */
export const getSearchDetailsArray = (data) => {
	const newTabs = data.slice(0);
	const foundItems = [];

	/* 
          For each item from data create an object with:
          { id, url, title, date}
  
          and sort them by date
  
          if data = [], then return null or stg
          */

	for (let i = 0; i < data.length; i++) {
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
 * Returns sorted/reduced array for detailed secondary screens
 * Detailed array consists of objects with props {id, url, title, date}
 *
 * @param {string} type normal | latest | ???
 * @param {Array} _tabsOverview - copy of tabsOverview object for reference
 * @param {*} props
 * @returns array = [{id, url, title, date}, ...]
 */
const getDetailedArray = (type, _tabsOverview, props = {}) => {
	let { count, index, data } = props;

	let array = [];
	if (type === 'details' && data) { // data === __tabs__
		array = getDetailsArray(index, _tabsOverview, data);
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