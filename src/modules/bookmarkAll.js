import { isSupportedProtocol, getTabDataFromId } from './helpers.js';

const addBookmarksToFolder = async (tabIds, parentId) => {
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
		await addBookmarksToFolder(tabIds, newFolder.id);

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
		await addBookmarksToFolder(overviewObject.ids, null);
		browser.runtime.sendMessage({ type: 'items-bookmarked', data: { index }});

		return;
	}

	const folderName = (new URL(overviewObject.url)).hostname;
	const searchResults = await bookmarks.search({title: folderName});

	if (await searchResults.length === 0) {
		const newFolder = await bookmarks.create({title: folderName });
        
		await addBookmarksToFolder(overviewObject.ids, newFolder.id);

		console.log('Items added to new folder!');
	} else {
		await mergeBookmarksInFolder(overviewObject.ids, searchResults, folderName);
	}

	browser.runtime.sendMessage({ type: 'items-bookmarked', data: { index }});
};