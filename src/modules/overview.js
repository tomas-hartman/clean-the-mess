/**
 * Function that creates data structure for overview grouping. 
 * @todo It also handles group naming, but it needs refactoring.
 * @param {Object[]} tabs - Standard tabs object from browser
 * @returns {Object[]} Sorted array of objects that are used for overview grouping
 */
export const getOverview = (tabs) => {
	const tabsOverview = [];

	tabs.forEach((tab) => {
		let url = {};
		let originUrl = '';

		try {
			url = new URL(tab.url);
			originUrl = url.origin;
	
			if (originUrl === 'null' || url.protocol === 'moz-extension:' || url.protocol === 'chrome:' || url.protocol === 'file:') {
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

export default getOverview;