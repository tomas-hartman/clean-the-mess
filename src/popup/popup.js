import search from '../modules/search.js';

const locale = {
	string: 'cs-CZ',
	options: {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	},
};

let tabs = [];
let windows = [];
let tabsOverview = []; // fills with getOverview
const latestShownCount = 10;


/**
 * Converts string to html-safe code. Useful for titles to be displayed.
 * @see https://stackoverflow.com/a/57448862/11243775
 * @param {string} str 
 */
const escapeHTML = str => str.replace(/[&<>'"]/g, 
	tag => ({
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'\'': '&#39;',
		'"': '&quot;'
	}[tag]));

const getSearchDetailsArray = (data) => {
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

		let date = new Intl.DateTimeFormat(locale.string, locale.options).format(
			new Date(newTabs[i].lastAccessed)
		);

		output.date = date;
		output.title = newTabs[i].title;
		output.id = newTabs[i].id;
		output.url = newTabs[i].url;

		foundItems.push(output);
	}

	// sort the results by date or relevancy?

	// console.log(foundItems);

	return foundItems;
};

/**
 * @todo Work on detailed and better filtered return array
 * @param {array} tabs tabs query array
 * @param {number} numOfLatest optional, is equal to 10 normally
 */
const getLatestUsed = (tabs, numOfLatest = 10) => {
	let newTabs = tabs.slice(0);
	let iterationsNum = numOfLatest;
	let latest = [];

	if (tabs.length < iterationsNum) iterationsNum = tabs.length;

	newTabs.sort((a, b) => a.lastAccessed - b.lastAccessed);

	for (let i = 0; i < iterationsNum; i++) {
		if (newTabs[i].pinned) continue;

		let output = {};
		let date = new Intl.DateTimeFormat(locale.string, locale.options).format(
			new Date(newTabs[i].lastAccessed)
		);

		output.date = date;
		output.title = newTabs[i].title;
		output.id = newTabs[i].id;
		output.url = newTabs[i].url;

		latest.push(output);
	}

	return latest;
};

const getOverview = (tabs) => {
	const tabsOverview = [];

	tabs.forEach((tab) => {
		let url = {};
		let originUrl = '';

		try {
			url = new URL(tab.url);
			originUrl = url.origin;
    
			if (originUrl === 'null' || url.protocol === 'moz-extension:') {
				switch (url.protocol) {
				case 'about:':
				case 'moz-extension:':
				case 'chrome:':
					originUrl = 'Browser tabs';
					break;
				case 'file:':
					originUrl = 'Opened files';
					break;
				case 'localhost:':
					originUrl = 'Localhost';
					break;
				default:
					originUrl = 'Other tabs';
					break;
				}
			}
		} catch(err){
			if(tab.url === 'localhost'){
				originUrl = 'Localhost';
			} else if((/^((\d{1,3}.){3}\d{1,3})(:|\/|\s|$)/g).test(tab.url)){
				const array = tab.url.split(/:|\//);
				originUrl = array[0];
			} else {
				originUrl = 'Other tabs';
			}
		}

		if (!tab.pinned) {
			if (tabsOverview.some((website) => website.url === originUrl)) {
				const index = tabsOverview.findIndex(
					(website) => website.url === originUrl
				);

				tabsOverview[index].count += 1;
				tabsOverview[index].ids.push(tab.id);
			} else {
				tabsOverview.push({ url: originUrl, count: 1, ids: [tab.id] });
			}
		}
	});

	tabsOverview.sort((a, b) => b.count - a.count);

	// browser.browserAction.setBadgeText({text: `${tabs.length}`});

	return tabsOverview;
};


/**
 * Returns single overview item component 
 * @param {object} props { itemId, data }; data = { url, count } ; data come from _tabsOverview_
 * @returns {node} <li /> to be used with createOverviewList()
 */
const createSingleOverviewItem = (props) => {
	let { itemId, data } = props;
	let { url, count } = data;

	/**
     * I want to render bookmark button conditionally
     * @param {string} _url 
     */
	const getBookmarkAllButton = (_url) => {
		const nonBookmarkablesList = ['Browser tabs', 'Opened files'];
		if(nonBookmarkablesList.includes(_url)) return '';

		return '<div class="bookmark-all hidden" title="Bookmark and close all items"></div>';
	};

	let blueprint = `
        <li class="url-${itemId} overview-item" data-index-number="${itemId}">
            <div class="url-container">
                <div class="main-item-text-container">
                    <div class="url" title="${url}">${url}</div>
                    <div class="count">(${count})</div>
                </div>
                <div class="item-buttons-container">
                    <div class="get-in"></div>
                    ${getBookmarkAllButton(data.url)}
                    <div class="remove hidden" title="Close all tabs with this url"></div>
                </div>
            </div>
        </li>`;

	const node = blueprint ? document.createRange().createContextualFragment(blueprint) : null;
    
	return node;
};

/**
 * Creates overview list
 * @param {array} tabsOverview
 * @returns {node} ul#list > li.overview-item*n
 */
const createOverviewList = (tabsOverview) => {
	return new Promise((resolve, _reject) => {
		const ul = document.createElement('ul');
		ul.setAttribute('id', 'list');

		for (let i = 0; i < tabsOverview.length; i++) {
			const props = {
				itemId: i,
				data: tabsOverview[i],
			};

			const overviewItemComponent = createSingleOverviewItem(props);
            
			ul.appendChild(overviewItemComponent);
		}

		resolve(ul);
	});
};

/**
 * Naming convention:
 *
 * render - appending and manipulating DOM
 * create - creating DOM
 * get - getting data
 */

/**
 * Returns simple separator node
 * Used in createHeader*
 */
const createSeparator = () => {
	const separatorStr = '<div class="separator separator-bottom"></div>';
	const separator = separatorStr && document.createRange().createContextualFragment(separatorStr);

	return separator;
};

/**
 * Creates header for "latest" and "details"
 * @param {number} index id number from __tabsOverview__ array
 * @param {string} type 'latest' or 'details'
 * @todo If I put only tabsOverview item in, I could get rid of index
 */
const createHeaderScreen = (index = null, type, tabsOverview) => {
	// components: back button, title, ?closeAll, ?search

	const headerTitle = getHeaderTitle(index, type, tabsOverview);

	const backBtnStr = '<div class="back go-back" title="Back"></div>';
	const headerTitleDivStr = `<div class="header-title">${headerTitle}</div>`;
	const closeAllElement = `<div class="close-all" data-index-number="${index}" title="Close all listed tabs"></div>`;
	const closeAllDivStr = type !== 'latest' ? closeAllElement : '';
	const separator = createSeparator(); // node!

	const headerDivStr = `
            <div id="header" class="control">
                ${backBtnStr}
                ${headerTitleDivStr}
                ${closeAllDivStr}
            </div>
        `;

	const headerDiv =
        headerDivStr &&
        document.createRange().createContextualFragment(headerDivStr);
	const header = [headerDiv, separator];

	return header;
};

const createHeaderSearch = () => {
	// components: back button, title, ?closeAll, ?search

	const backBtnStr = '<div class="back go-back" title="Back"></div>';
	const headerTitleDivStr = `
            <div class="header-title">
                <div class="search-container">
                    <input type="search" name="search-input" id="search-input" placeholder="Type here" autofocus="autofocus" />
                    <div class="search-controls">
                        <span class="search-count"></span>
                        <button class="clear-search hidden">x</button>
                    </div>
                </div>                            
            </div>`;
	const closeAllDivStr = '<div class="close-all btn-inactive" title="Close all listed tabs"></div>';
	const separator = createSeparator(); // node!

	const headerDivStr = `
            <div id="header" class="control">
                ${backBtnStr}
                ${headerTitleDivStr}
                ${closeAllDivStr}
            </div>
        `;

	const headerDiv =
        headerDivStr &&
        document.createRange().createContextualFragment(headerDivStr);
	const header = [headerDiv, separator];

	return header;
};

const createHeaderOverview = () => {
	// Header title
	const windowStr = windows.length > 1 ? ' in this window' : '';
	const headerTitleContainerStr = '<div id="header" class="control header-overview"></div>';
	const headerTitleContainer =
        headerTitleContainerStr &&
        document.createRange().createContextualFragment(headerTitleContainerStr);

	const headerTitleStr = `<div class="header-title">
                                    <span>You have <span id="open-tabs-count">${tabs.length}</span> opened tabs${windowStr}.</span>
                                </div>
                                <div id="search-btn"></div>`;
	const headerTitle =
        headerTitleStr &&
        document.createRange().createContextualFragment(headerTitleStr);

	headerTitleContainer.firstChild.appendChild(headerTitle);

	// Header link to latest
	const unusedStr = `<div id="ten-unused">
                                <span>${latestShownCount} longest unused tabs</span>
                                <div class="get-in"></div>
                            </div>`;
	const unused =
        unusedStr && document.createRange().createContextualFragment(unusedStr);

	return [headerTitleContainer, createSeparator(), unused, createSeparator()];
};

/**
 * Creates screen header component
 *
 * @param {string} screenId
 * @param {object} props
 * @returns {node} <div class="header-container"><!-- Content --></div>
 */
const createHeader = (screenId, props = {}) => {
	let { index } = props;
	const headerStr = '<div class="header-container"></div>';
	const header =
        headerStr && document.createRange().createContextualFragment(headerStr);

	let contentArr = [];

	switch (screenId) {
	case 'overview':
		contentArr = createHeaderOverview();
		break;
	case 'search':
		contentArr = createHeaderSearch();
		break;
	case 'details':
	case 'latest':
		contentArr = createHeaderScreen(index, screenId, tabsOverview);
		break;
	default:
		break;
	}

	// console.log(contentArr);

	contentArr.forEach((elm) => {
		header.firstChild.append(elm);
	});

	setListenersHeader(header, index, screenId);

	return header;
};

const setListenersHeader = (header, index, screenId) => {
	header.firstChild.onclick = async (e) => {
		if (e.target.classList.contains('back')) {
			closeScreen();
		}
		if (e.target.closest('.close-all')) {
			/**
             * Close items from overview. Index = overviewItemId
             */
			if(screenId === 'details' && (index || index === 0)) {
				await removeTabsFromOverview(index);
    
				await refreshOverviewScreen(); // autoclose
			}

			/**
             * Close items from search
             */
			if(screenId === 'search') {
				await removeTabsFromSearch();
			}
		}
		if (e.target.closest('#ten-unused')) {
			const screen = await createScreen('latest');
			const dest = document.querySelector('#main-container');
			renderScreen(screen, dest);

			playTransition();
		}
		if (e.target.closest('#search-btn')) {
			const screen = await createScreen('search');
			const dest = document.querySelector('#main-container');

			setListenersSearch(screen);
			renderScreen(screen, dest);

			playTransition();

			// Focus on searchbar
			const setFocusOnSearchBar = () => {
				document.querySelector('#search-input').focus();
				document.querySelector('#search-input').select();
			};

			setTimeout(setFocusOnSearchBar, 0);

		}
	};
};

/**
 * Sets number of count into search input info
 * @todo similar implementation could be used for specifying "not found" error message
 * @param {number} count
 */
const setFoundCount = (count) => {
	const foundElm = document.querySelector('.search-count');
	if (count > 0) {
		foundElm.innerText = `(${count})`;
	} else foundElm.innerText = '';
};

const setListenersSearch = (node) => {
	const inputElm = node.querySelector('#search-input');
	let timeout; // waits until next char is typed in before it renders; default 200 ms

	inputElm.addEventListener('keyup', (event) => {
		clearTimeout(timeout);
		timeout = setTimeout(async () => {
			const found = search.perform(tabs, event.target.value);
			await refreshSearchScreen(found);
		}, 200);
	});
};

const setListenersOverview = (node) => {
	node.onmouseover = (e) => {
		if (e.target.closest('#overview li')) {
			const parentElm = e.target
				.closest('li')
				.querySelector('.item-buttons-container');
			parentElm.querySelector('.bookmark-all')?.classList.remove('hidden');
			parentElm.querySelector('.remove').classList.remove('hidden');
		}
	};
	node.onmouseout = (e) => {
		if (e.target.closest('#overview li')) {
			const parentElm = e.target
				.closest('li')
				.querySelector('.item-buttons-container');
			parentElm.querySelector('.get-in').classList.remove('hidden');
			parentElm.querySelector('.bookmark-all')?.classList.add('hidden');
			parentElm.querySelector('.remove').classList.add('hidden');
		}
	};

	node.onclick = async (e) => {
		const its = e.target;
		const tabsOverviewId = parseInt(its.closest('li').dataset.indexNumber);

		if (its.classList.contains('remove')) {
			await removeTabsFromOverview(tabsOverviewId);

			console.log('Tabs removed!');
		}

		if (its.classList.contains('bookmark-all')){

			browser.runtime.sendMessage({type: 'bookmark-all', data: { overviewObject: tabsOverview[tabsOverviewId], index: tabsOverviewId }});

			console.log('Bookmark all! Still some todos!');
		}

		if (!!its.closest('.overview-item') && !its.classList.contains('remove') && !its.classList.contains('bookmark-all')) {

			const screen = await createScreen('details', { index: tabsOverviewId });
			const dest = document.querySelector('#main-container');
			renderScreen(screen, dest);

			playTransition();
		}
	};

	/**
     * Listeners to messages from from background.js
     */
	browser.runtime.onMessage.addListener(async (message) => {
		switch (message.type) {
		case 'items-bookmarked':
			await removeTabsFromOverview(message.data.index);
			break;
        
		default:
			console.warn('Non-standard message received from background.js:');
			console.warn(message);
			break;
		}
	});
};

const playTransition = () => {
	new Promise((resolve, _reject) => {
		setTimeout(() => {
			resolve();
		}, 10);
	}).then(() => {
		document.querySelector('#overview').classList.add('slide-out');
		document.querySelector('.screen:not(#overview)').classList.add('slide-in');
	});
};

/**
 * Sets up listeners to screen
 * @param {DOM Node} node Node to which listeners should be set up
 * @param {array} array detailed array of items rendered in detailed screen
 * @param {object} params index: group index from __overview__
 */
const setListenersScreen = (node, array, params = {}) => {
	let { index } = params;

	node.onmouseover = (e) => {
		if (e.target.closest('li.detail')) {
			const parentElm = e.target
				.closest('li')
				.querySelector('.item-buttons-container');
			parentElm.querySelector('.bookmark-close')?.classList.remove('hidden'); // .bookmark-close
			parentElm.querySelector('.remove').classList.remove('hidden'); // .remove
			parentElm.querySelector('.get-in').classList.add('hidden'); // .get-in
		}
	};

	node.onmouseout = (e) => {
		if (e.target.closest('li.detail')) {
			const parentElm = e.target
				.closest('li')
				.querySelector('.item-buttons-container');
			parentElm.querySelector('.bookmark-close')?.classList.add('hidden');
			parentElm.querySelector('.remove').classList.add('hidden');
			parentElm.querySelector('.get-in').classList.remove('hidden');
		}
	};

	node.onclick = (e) => {
		if (e.target.classList.contains('bookmark-close')) {
			// bookmark & remove tab
			const id = parseInt(e.target.closest('li').dataset.tabId);
			const arrItem = array.filter((item) => item.id === id)[0];
			const url = arrItem.url;
			const title = arrItem.title;

			bookmarkTab(url, title, id);
			removeTab(e, array, { index });
		}
		if (e.target.classList.contains('remove')) {
			removeTab(e, array, { index });
		}
		if (
			(e.target.closest('li') &&
                !e.target.classList.contains('remove') &&
                !e.target.classList.contains('bookmark-close')) ||
            e.target.classList.contains('bookmarked')
		) {
			// switchTo tab
			const id = parseInt(e.target.closest('li').dataset.tabId);
			browser.tabs.update(id, { active: true });
		}
	};
};

/**
 * Creates screen body component (with list of items). Adds list of items to container and returns it, based on its type.
 *
 * @param {string} screenId
 * @param {object} props
 * @returns {node} <div class="body-container"><!-- Content of body component - ul --></div>
 */
const createBody = async (screenId, props = {}) => {
	let { index, data } = props;
	const bodyStr = '<div class="body-container"></div>';
	const body =
        bodyStr && document.createRange().createContextualFragment(bodyStr);

	let content = '';
	let dataArr = [];

	switch (screenId) {
	case 'overview':
		content = await createOverviewList(tabsOverview);
		setListenersOverview(content);
		break;
	case 'details':
	case 'latest':
		dataArr = getDetailedArray(screenId, {
			count: latestShownCount,
			index,
			data: tabs,
		});
		content = await createList(screenId, dataArr);
		setListenersScreen(content, dataArr, { index });
		break;
	case 'search':
		dataArr = getDetailedArray(screenId, { data });
		content = await createList(screenId, dataArr);
		setListenersScreen(content, dataArr, { index });
		break;
	default:
		console.error('Error: body element couldn\'t be created.');
		break;
	}

	body.firstChild.append(content);

	return body;
};

/**
 * Creates HTML Node with screen, filled with header and body.
 * Screen can be rendered with renderScreen.
 *
 * @param {string} screenId 'overview', 'details', 'latest'
 * @param {obj} props optional properties such as index number etc.
 * @returns {node} <div id="overview" class="screen"> header + body </div>
 */
const createScreen = async (screenId, props = {}) => {
	const screenStr = `<div id="${screenId}" class="screen"></div>`;
	const screen =
        screenStr && document.createRange().createContextualFragment(screenStr);

	const header = createHeader(screenId, props);
	const body = await createBody(screenId, props);

	screen.firstChild.append(header);
	screen.firstChild.append(body);

	// console.log(screen);

	return screen;
};

/**
 * Appends `screen` (html node) to `dest`
 *
 * @param {HTML Node} screen Node created by createScreen()
 * @param {HTML Node} dest Node found by querySelector
 */
const renderScreen = (screen, dest) => {
	// @todo check if dest === node !!

	dest.appendChild(screen);
};

/**
 * Use only after removal!
 * @param {string} data id of selected url from tabsOverview
 */
const refreshOverviewData = async (data) => {
	tabs = await browser.tabs.query({ currentWindow: true });
	let currentTabsNum = parseInt(
		document.querySelector('#open-tabs-count').innerText
	);
	let tabsNum = tabsOverview[data].ids.length;
	let newTabsNum = currentTabsNum - tabsNum;

	refreshOpenTabsCount(newTabsNum);

	document.querySelector(`li.url-${data}`).remove();
};

/**
 * Changes tabs count in header
 * @param {number} newCount
 */
const refreshOpenTabsCount = (newCount) => {
	const span = document.querySelector('#open-tabs-count');
	span.innerText = newCount;
};

/**
 * Use only after details to overview transition (pressing back button)
 */
const refreshOverviewScreen = async (props = {}) => {
	let { deletedId = false } = props;

	// console.log(deletedId);
	document.querySelector('#overview').classList.add('slide-in-reverse');
	document
		.querySelector('.screen:not(#overview)')
		.classList.add('slide-out-reverse');

	document.addEventListener(
		'transitionend',
		() => {
			document.querySelector('#overview').classList = 'screen';
		},
		{ once: true }
	);

	if (deletedId)
		tabs.splice(
			tabs.findIndex((tab) => tab.id === deletedId),
			1
		);

	tabs = await browser.tabs.query({ currentWindow: true });
	tabsOverview = getOverview(tabs);

	const newBodyContainer = await createBody('overview');

	refreshOpenTabsCount(tabs.length);

	document.querySelector('.body-container').remove();
	document.querySelector('#overview').appendChild(newBodyContainer);

	// autoclose function
	document.querySelector('.screen:not(#overview)').remove();
	document.querySelector('#main-container').style.left = '0px';
};

/**
 * Refreshes searchScreen, needs to include result of search.perform of []
 * @param {object} data Data which should be used in search query; usually result of search.perform()
 */
const refreshSearchScreen = async (data) => {
	const bodyContainer = await createBody('search', { data });
	const oldBodyContainer = document.querySelector(
		'#search > .body-container'
	);
	const dest = oldBodyContainer.parentNode;
	const hasData = !!data[0];

	setFoundCount(data.filter((item) => !item.pinned).length);
	toggleButtonActive('.close-all', hasData);

	if (oldBodyContainer) {
		oldBodyContainer.remove();
	}

	renderScreen(bodyContainer, dest);
};

/**
 * @param {element} target
 * @param {*} indexNumber tabsOverview index number
 */
const removeTabsFromOverview = async (indexNumber) => {
	const id = tabsOverview[indexNumber].ids;
	if (id.length > 10) {
		if (confirm(`Are you sure you want to close ${id.length} tabs?`)) {
			await browser.tabs.remove(id);
			await refreshOverviewData(indexNumber);
		} else return;
	} else {
		await browser.tabs.remove(id);
		await refreshOverviewData(indexNumber);
	}
};

/**
 * Removes tabs from search screen
 */
const removeTabsFromSearch = async () => {
	const lis = Array.from(document.querySelectorAll('#search .body-container li'));
	const ids = lis.map((item) => {
		if(item.dataset.tabId) {
			return parseInt(item.dataset.tabId, 10);    
		} else return null;
	});

	if(ids[0] && confirm(`Are you sure you want to close ${ids.length} tabs?`)){
		await browser.tabs.remove(ids);
		tabs = await browser.tabs.query({ currentWindow: true });
		await refreshSearchScreen([]);
	}
};

const getDetailsArray = (overviewId, tabsOverview, data) => {
	const ids = tabsOverview[overviewId].ids;
	let array = [];

	for (let i = 0; i < ids.length; i++) {
		array.push(...data.filter((tab) => tab.id === ids[i]));
	}

	array.sort((a, b) => b.lastAccessed - a.lastAccessed);

	return array;
};

const addBookmarkStatus = async (item) => {
	// I will not check for duplicate items with some special protocols in bookmarks
	if(hasIgnoredProtocol(item.url)) return;

	const bookmarks = await browser.bookmarks.search({ url: item.url });
	const elm = document.querySelector(`li[data-tab-id='${item.id}'] .bookmark`);

	if (bookmarks.length > 0) {
		elm.classList.add('bookmarked');
		elm.classList.remove('bookmark-close');
		elm.setAttribute('title', 'This url is already bookmarked');
	}
};

const bookmarkTab = async (url, title, _id) => {
	const isSupportedProtocol = (url) => {
		const supportedProtocols = ['https:', 'http:', 'ftp:', 'file:'];
		const urlObj = new URL(url);

		return supportedProtocols.indexOf(urlObj.protocol) != -1;
	};

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

/**
 * removeTab() use for removing tabs in detailed screens
 * @param {event} e
 * @param {array} detailsArr DETAILED array of tabs taken from __tabs__
 * @param {boolean} autoclose determines if screen closes with last closed item
 * @param {number} index id of grouped overview array
 */
const removeTab = async (e, detailsArr, props = {}) => {
	let { autoclose = true, index } = props;
	const id = parseInt(e.target.closest('li').dataset.tabId);
	// id: index in __tabs__ (tab index)
	// index: index in __overview__ (group index)

	// remove tab
	detailsArr.splice(
		detailsArr.findIndex((tab) => tab.id === id),
		1
	); // removes item from detailed array
	if (index) {
		tabsOverview[index].ids.splice(tabsOverview[index].ids.indexOf(id), 1); // removes tab id from __overview__.ids; only detailed screen
	}
	await browser.tabs.remove([id]); // closes tab in browser

	e.target.closest('li').remove(); // removes node

	// autoclose
	if (autoclose && detailsArr.length === 0) {
		await refreshOverviewScreen({ deletedId: id });
	}
};

/**
 * Closes opened screen
 */
const closeScreen = async () => {
	await refreshOverviewScreen();
};

// Returns headerTitle for secondary screens
const getHeaderTitle = (id, type, tabsOverview) => {
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
		headerTitle = `${latestShownCount} longest unused tabs`;
	} else headerTitle = null;

	return headerTitle;
};

/**
 * Returns sorted/reduced array for detailed secondary screens
 * Detailed array consists of objects with props {id, url, title, date}
 *
 * @param {string} type normal | latest | ???
 * @param {*} props
 * @returns array = [{id, url, title, date}, ...]
 */
const getDetailedArray = (type, props = {}) => {
	let { count, index, data } = props;

	let array = [];
	if (type === 'details' && data) { // data === __tabs__
		array = getDetailsArray(index, tabsOverview, data);
	} else if (type === 'latest' && count && data) {
		array = getLatestUsed(data, count);
	} else if (type === 'search' && data) {
		array = getSearchDetailsArray(data);
	} else {
		console.log('Error: got wrong params on getDetailedArray()');
	}

	return array;
};

/**
 * Handles which details should be displayed for given type of screen
 * @param {string} type 
 * @param {string} className 
 */
const setClass = (type, className) => {
	const dict = {
		details: {
			url: '',
			lastDisplayed: 'hidden',
		},
		latest: {
			url: 'hidden',
			lastDisplayed: '',
		},
		search: {
			url: '',
			lastDisplayed: 'hidden',
		},
	};

	// eslint-disable-next-line no-useless-catch
	try {
		if(dict[type]){
			return dict[type][className];
		} else {
			console.error('Error: this screen type is not defined.');
			return '';
		}
	} catch (err) {
		throw err;
	}
};

/**
 * Toggles button element's class, so it should be inactive or active
 * @param {string} className class of the button element
 * @param {boolean} isActive defines whether element with given className should contain class btn-inactive or not
 */
const toggleButtonActive = (className, isActive) => {
	const element = document.querySelector(`${className}`);
	const inactiveClassName = 'btn-inactive';

	if(isActive) {
		element.classList.remove(inactiveClassName);
	} else element.classList.add(inactiveClassName);
};

/**
 * Checks if url has some of the special protocols, that do not work well with certain features and APIs such as bookmarks
 * @param {string} url 
 */
const hasIgnoredProtocol = (url) => {
	const ignoredProtocols = ['about:', 'moz-extension:', 'chrome:', 'file:'];
	const { protocol } = new URL(url);

	if(ignoredProtocols.includes(protocol)) {
		return true;
	} else return false;
};

/**
 * Create single detailed item component for both latest and all detailed screens
 * @param {object} props { itemId, data, type }; data = { id, title, url, date }
 * @returns {node} <li /> for use with createList() 
 */
const createSingleDetailItem = (props) => {
	let { itemId, data, type } = props;
	let { id, title, url, date } = data;

	const getBookmarkAndCloseButton = (_url) => {
		if(hasIgnoredProtocol(_url)) return '';

		return '<div class="bookmark bookmark-close detail hidden" title="Bookmark and close tab"></div>';
	};

	const decodedUrl = escapeHTML(decodeURI(url));
	const blueprint = `
        <li id="item-${itemId}" class="detail" data-tab-id="${id}">
            <div class="item-container detail">
                <div class="item-text-container">
                    <div class="title detail" title="${title}">${escapeHTML(title)}</div>
                    <div class="url detail ${setClass(type,'url')}" title="${decodedUrl}">${decodedUrl}</div>
                    <div class="last-displayed detail ${setClass(type,'lastDisplayed')}" title="${date}">${date}</div>
                </div>
                <div class="item-buttons-container">
                    ${getBookmarkAndCloseButton(url)}
                    <div class="remove detail hidden" title="Close tab"></div>
                    <div class="get-in"></div>
                </div>
            </div>
        </li>
        `;
    
	const node = blueprint ? document.createRange().createContextualFragment(blueprint) : null;

	return node;
};

/**
 * Main function for generating secondary screen lists
 * Replaces showScreen which replaced showLatestDisplayed() and showDetailedScreen()
 * @param {string} type
 * @param {array} array of objects. array for type=details is filter from __tabs__, for latest it's different pre-processed
 * @returns {node} ul
 */
const createList = (type, array) => {
	const ul = document.createElement('ul');

	// Fill in with detailed items
	for (let i = 0; i < array.length; i++) {
		const props = {
			itemId: i,
			data: array[i],
			type
		};
		const detailItem = createSingleDetailItem(props);

		if(detailItem){
			ul.appendChild(detailItem);
			addBookmarkStatus(array[i]);
		}
	}

	if (type === 'search' && array.length === 0) {
		const text = `
            <li id="nothing-to-show">
                <div class="item-container error">
                    Nothing to display. Either nothing was found or the search hasn't started yet.
                </div>
            </li>
            `;

		if (text) {
			ul.appendChild(document.createRange().createContextualFragment(text));
		}
	}

	return ul;
};

/**
 * Handles first run events, creates overview screen and renders it
 */
const init = async () => {
	tabs = await browser.tabs.query({ currentWindow: true });
	windows = await browser.windows.getAll();
	tabsOverview = getOverview(tabs);

	const initialDest = document.querySelector('#main-container');
	const screen = await createScreen('overview');

	renderScreen(screen, initialDest);
};

init();

// try {
module.exports = { 
	getHeaderTitle, 
	setClass,
	createSingleDetailItem,
	createSingleOverviewItem,
	createHeaderScreen,
	getDetailedArray,
	getDetailsArray,
	getLatestUsed,
	getOverview,
	setFoundCount,
	bookmarkTab,
	tabsOverview,
};
// } catch (err){
//     console.log("Popup run in production environment.");
// }