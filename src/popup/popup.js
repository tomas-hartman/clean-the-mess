import search from '../modules/search.js';
// import getOverview from '../modules/overview.js';
import { getDetailedArray } from '../modules/details.js';
import { hasIgnoredProtocol, escapeHTML, callWithConfirm, setFoundCount, getHeaderTitle, getOverviewData, saveTabsOverviewData } from '../modules/helpers.js';
import { addBookmarkStatus, bookmarkTab } from '../modules/bookmarks.js';

/**
 * Globals
 */
let tabsData = []; // has tid
let windows = [];
const latestShownCount = 10;

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

	// data-index-number="${itemId}"
	let blueprint = `
        <li class="url-${itemId} overview-item" data-key="${data.key}">
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
	
	return ul;
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

	const headerTitle = getHeaderTitle(index, type, tabsOverview, latestShownCount);

	const backBtnStr = '<div class="back go-back" title="Back"></div>';
	const headerTitleDivStr = `<div class="header-title">${headerTitle}</div>`;
	const closeAllElement = `<div class="close-all" data-index-number="${index}" title="Close all listed tabs"></div>`; // data-index-number="${index}" could be changed into key: and handled by this, not neccessary!
	const closeAllDivStr = type !== 'latest' ? closeAllElement : '';
	const separator = createSeparator(); // node!

	const headerDivStr = `
            <div id="header">
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
            <div id="header">
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
	const headerTitleContainerStr = '<div id="header" class="header-overview"></div>';
	const headerTitleContainer =
        headerTitleContainerStr &&
        document.createRange().createContextualFragment(headerTitleContainerStr);

	const headerTitleStr = `<div class="header-title">
                                    <span>You have <span id="open-tabs-count">${tabsData.length}</span> opened tabs${windowStr}.</span>
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
const createHeader = async (screenId, props = {}) => {
	let { index } = props;
	const overviewData = await getOverviewData();
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
		contentArr = createHeaderScreen(index, screenId, overviewData);
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

const setListenersSearch = (node) => {
	const inputElm = node.querySelector('#search-input');
	let timeout; // waits until next char is typed in before it renders; default 200 ms

	inputElm.addEventListener('keyup', (event) => {
		clearTimeout(timeout);
		timeout = setTimeout(async () => {
			const found = search.perform(tabsData, event.target.value);
			await refreshSearchScreen(found);
		}, 200);
	});
};

const setListenersOverview = async (node) => {
	// const overviewData = await getOverviewData();

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
		const overviewData = await getOverviewData();
		const tabsOverviewKey = parseInt(its.closest('li').dataset.key);
		const tabsOverviewId = overviewData.findIndex((item) => item.key === tabsOverviewKey);

		if (its.classList.contains('remove')) {
			console.log(tabsOverviewId);
			await removeTabsFromOverview(tabsOverviewId);

			console.log('Tabs removed!');
		}

		if (its.classList.contains('bookmark-all')){
			const numOfItems = overviewData[tabsOverviewId].ids.length;
			const folderName = (new URL(overviewData[tabsOverviewId].url)).hostname;

			const onTrue = () => browser.runtime.sendMessage({type: 'bookmark-all', data: { overviewObject: overviewData[tabsOverviewId], index: tabsOverviewId }});
			const onFalse = () => { return; };

			if(numOfItems > 1){
				callWithConfirm('bookmarkAll', onTrue, onFalse, numOfItems, folderName);
			} else {
				onTrue();
			}
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
			await removeTabsFromOverview(message.data.index, { forceRemove: true }); // this should just call remove tabs without anything else, it should not ask HERE
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
			parentElm.querySelector('.bookmarked')?.classList.remove('hidden'); // .bookmarked
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
			parentElm.querySelector('.bookmarked')?.classList.add('hidden');
			parentElm.querySelector('.remove').classList.add('hidden');
			parentElm.querySelector('.get-in').classList.remove('hidden');
		}
	};

	node.onclick = async (e) => {
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
			// console.log('removed detail');
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
			await browser.tabs.update(id, { active: true });
		}
	};
};

/**
 * Creates screen body component (with list of items). Adds list of items to container and returns it, based on its type.
 * It works this way:
 * 
 * 1. gathers data based on type of the screen
 * 2. creates DOM content based on the data
 * 3. sets listeners for elements in the node
 * ---
 * 4. creates DOM node and appends previosly created node to it
 * 5. returns this node
 *
 * @param {string} screenId
 * @param {object} props
 * @returns {node} <div class="body-container"><!-- Content of body component - ul --></div>
 */
const createBody = async (screenId, props = {}) => {
	let { index, data } = props;

	const overviewData = await getOverviewData();

	const bodyStr = '<div class="body-container"></div>';
	const body =
        bodyStr && document.createRange().createContextualFragment(bodyStr);

	let content = ''; // this shoud be general
	let dataArr = []; // this should be internal variable; pre-made grouped output of getDetailedArray

	const asyncSwitch = async (statement) => {
		switch (statement) {
		case 'overview':
			content = await createOverviewList(await overviewData);
			setListenersOverview(content);
			break;
		case 'details':
		case 'latest':
			dataArr = getDetailedArray(screenId, await overviewData, {
				count: latestShownCount,
				index,
				data: await browser.tabs.query({ currentWindow: true }), // !== Overview data!!, === tabsData
			});
				
			content = await createList(screenId, dataArr);
			setListenersScreen(content, dataArr, { index });
			break;
		case 'search':
			dataArr = getDetailedArray(screenId, await overviewData, { data });
			content = await createList(screenId, dataArr);
			setListenersScreen(content, dataArr, { index });
			break;
		default:
			console.error('Error: body element couldn\'t be created.');
			break;
		}
	};

	await asyncSwitch(screenId);

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

	const header = await createHeader(screenId, props);
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
 * Use only after removal of an item in overview!
 * @param {string} oid overviewData id of node item that should be removed from overview 
 */
const refreshOverviewData = async (oid) => {
	// const overviewData = await saveTabsOverviewData();
	const overviewData = await getOverviewData(); // Gets overview data to perform changes on them
	/**
	 * @todo this should only tell tabs to refresh
	 * ---> refreshTabsData() --> refresh them on background
	 */
	tabsData = await browser.tabs.query({ currentWindow: true }); // this should be handled on background 
	let currentTabsNum = parseInt(
		document.querySelector('#open-tabs-count').innerText
	);
	let tabsNum = overviewData[oid].ids.length;
	let newTabsNum = currentTabsNum - tabsNum;

	refreshOpenTabsCount(newTabsNum);

	document.querySelector(`li.url-${oid}`).remove();
	
	await saveTabsOverviewData(); // Saves those changes for the next rerender
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
 * Use only when pressing back button (= after details to overview transition)
 */
const refreshOverviewScreen = async (props = {}) => {
	let { deletedId = false } = props;

	// Manipulate DOM
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

	/**
	 * @todo this could be optimized by refreshing tabs directly.
	 * there is however a risk, that tabs data will be inaccurate due to async
	 * This actually is a temporary workaround to manually removes item from tabs 
	 * before they are REALLY refreshed.
	 */
	if (deletedId) {
		tabsData.splice(
			tabsData.findIndex((tab) => tab.id === deletedId),
			1
		);
	}

	tabsData = await browser.tabs.query({ currentWindow: true }); // tohle by se mělo generovat na pozadí

	const newBodyContainer = await createBody('overview');

	refreshOpenTabsCount(tabsData.length);


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
 * Removes tabs with given ids from overview. 
 * @param {number} indexNumber tabsOverview index number
 * @param {Object} options 
 * @param {Boolean} [options.forceRemove = false] Forces removal without confirm (= removal was confirmed previously as in bookmark-all)
 */
const removeTabsFromOverview = async (indexNumber, options = {}) => {
	const overviewData = await getOverviewData();
	const id = overviewData[indexNumber].ids; // @todo handle this with key hash
	const { forceRemove = false } = options;

	const removeTabs = async (indexNumber, id) => {
		await browser.tabs.remove(id);
		await refreshOverviewData(indexNumber);
	};

	// Callbacks
	const onTrue = async () => await removeTabs(indexNumber, id);
	const onFalse = () => { return; };

	// Case: standard case
	if (!forceRemove && id.length > 10) {
		callWithConfirm('closeTabs', onTrue, onFalse, id.length);
	} else {
		await removeTabs(indexNumber, id);
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

	const onTrue = async () => {
		await browser.tabs.remove(ids);
		// await saveTabsOverviewData(); // this should be handled on background
		tabsData = await browser.tabs.query({ currentWindow: true }); // !== Overview data!!
		await refreshSearchScreen([]);
	};

	const onFalse = () => {
		console.log('Tabs were not removed from search.');
	};

	if(ids[0]){
		callWithConfirm('closeTabs', onTrue, onFalse, ids.length);
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
	const overviewData = await getOverviewData();
	const id = parseInt(e.target.closest('li').dataset.tabId);
	// id: index in __tabs__ (tab index)
	// index: index in __overview__ (group index)

	// remove tab
	detailsArr.splice(
		detailsArr.findIndex((tab) => tab.id === id),
		1
	); // removes item from detailed array

	/**
	 * @todo remove calls to overviewData[index]
	 */
	if (index) {
		overviewData[index].ids.splice(overviewData[index].ids.indexOf(id), 1); // removes tab id from __overview__.ids; only detailed screen
	}

	await browser.tabs.remove([id]); // closes tab in browser

	e.target.closest('li').remove(); // removes node

	// autoclose
	if (autoclose && detailsArr.length === 0) {
		// await saveTabsOverviewData();
		await refreshOverviewScreen({ deletedId: id });
	}
};

/**
 * Closes opened screen
 */
const closeScreen = async () => {
	await refreshOverviewScreen();
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

			addBookmarkStatus(array[i], document);
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
	tabsData = await browser.tabs.query({ currentWindow: true }); // this should be handled on background
	windows = await browser.windows.getAll();

	const initialDest = document.querySelector('#main-container');
	const screen = await createScreen('overview');

	renderScreen(screen, initialDest);
};

init();

export { 
	getHeaderTitle, 
	setClass,
	createSingleDetailItem,
	createSingleOverviewItem,
	createHeaderScreen,
	setFoundCount,
};