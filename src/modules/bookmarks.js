import { isSupportedProtocol, getTabDataFromId, hasIgnoredProtocol } from './helpers.js';

/**
 * Background
 */

const bookmarkTabsToFolder = async (tabIds, parentId) => {
	for(let i = 0; i < tabIds.length; i++) {
		const [title, url] = await getTabDataFromId(tabIds[i]);
    
		/**
		 * This does not search only in the given folder but everywhere!
		 * Currently a feature (to keep bookmarks clean), but it could be reconsidered.
		 */
		const duplicates = await browser.bookmarks.search(url); 

		if(duplicates.length === 0 && isSupportedProtocol(url)){
			await browser.bookmarks
				.create({ title, url, parentId })
				.catch((err) => console.log(err));
		} else console.log(`Item with url ${url} already exists and was skipped.`);
	}
};

/**
 * Handles merge in bookmarks folder and duplicate folder/bookmarks names.
 * 
 * @param {array} tabIds Array of ids of current tabs
 * @param {array} foundItems Array of items already found in bookmarks (usually should be 0 or 1)
 * @param {string} folderName Name of new folder in case it should be created
 */
const mergeBookmarksInFolder = async (tabIds, foundItems, folderName) => {
	// Returns first folder of its name into which I will add the new files
	const folder = foundItems.find((item) => item.type === 'folder');

	if(!folder) {
		const newFolder = await browser.bookmarks.create({title: folderName });
		await bookmarkTabsToFolder(tabIds, newFolder.id);

		console.log('Items added to new folder!');

		return;
	} 

	const parentId = folder.id;
	const folderChildren = await browser.bookmarks.getChildren(parentId);

	for(let i=0;i<tabIds.length;i++){
		const [title, url] = await getTabDataFromId(tabIds[i]);

		if(!isSupportedProtocol(url)) return;

		const isAlreadyBookmarked = folderChildren.some((child) => child.title === title);

		if(!isAlreadyBookmarked) {
			await browser.bookmarks
				.create({ title, url, parentId })
				.catch((err) => console.log(err));

			console.log('Items were merged with those from folder.');
		} else console.log(`Item with url ${url} is already in folder ${folderName} and was skipped.`);
	}
};

/**
 * Handles bookmark-all calls.
 * 
 * 1. assumes folder-name and checks if given folder name already exists
 * 2. if not, it creates the folder and adds all of them in the folder
 * 3. if so, it merges new items with the items already found in the folder
 * 
 * Duplicate bookmarks are always skipped. In case of duplicate folders, first folder is used.
 * 
 * @param {Object} _data Data object containing tabsOverviewId  
 * @param {Object} _data.overviewObject tabsOverview item
 * @param {number} _data.index tabsOverview id
 */
export const handleBookmarkAll = async (_data) => {
	const { overviewObject, index } = _data;
	const {bookmarks} = browser;

	// It does not merge items in bookmark root
	if(overviewObject.ids.length === 1) {
		await bookmarkTabsToFolder(overviewObject.ids, null);
		browser.runtime.sendMessage({ type: 'items-bookmarked', data: { index }});

		return;
	}

	const folderName = (new URL(overviewObject.url)).hostname;
	const searchResults = await bookmarks.search({title: folderName});

	if (await searchResults.length === 0) {
		const newFolder = await bookmarks.create({title: folderName });
        
		await bookmarkTabsToFolder(overviewObject.ids, newFolder.id);

		console.log('Items added to new folder!');
	} else {
		await mergeBookmarksInFolder(overviewObject.ids, searchResults, folderName);
	}

	browser.runtime.sendMessage({ type: 'items-bookmarked', data: { index }});
};


/**
 * Popup
 */

/**
 * Adds bookmark status to given element
 * @param {Object} item Object from screen detailed object
 * @param {Element} _document instance of document in whose context is bookmarked element located
 */
export const addBookmarkStatus = async (item, _document) => {
	// I will not check for duplicate items with some special protocols in bookmarks
	if(hasIgnoredProtocol(item.url)) return;

	const bookmarks = await browser.bookmarks.search({ url: item.url });
	const elm = _document.querySelector(`li[data-tab-id='${item.id}'] .bookmark`);

	if (bookmarks.length > 0) {
		elm.classList.add('bookmarked');
		elm.classList.remove('bookmark-close');
		elm.setAttribute('title', 'This url is already bookmarked');
	}
};

/**
 * Saves element with given _id as a new bookmark with given title and url and plays browser action with icon
 * @param {string} url 
 * @param {string} title 
 * @param {number} _id 
 */
export const bookmarkTab = async (url, title, _id) => {
	if (isSupportedProtocol(url)) {
		// check if folder exists and create special folder?
		await browser.bookmarks
			.create({ title: title, url: url })
			.catch((err) => console.log(err));
		await browser.browserAction.setIcon({
			path: '../icons/btn-bookmark-star-blue.svg',
		});

		new Promise((resolve, _reject) => {
			setTimeout(() => {
				browser.browserAction.setIcon({});
				resolve();
			}, 700);
		});
		console.log('New bookmark created');
	}
};