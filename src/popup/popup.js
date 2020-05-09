(async () => {
    const locale = {
        string: "cs-CZ",
        options: {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric' 
        }
    }

    let tabs = await browser.tabs.query({currentWindow: true});
    const windows = await browser.windows.getAll();
    let tabsOverview = []; // fills with getOverview
    const latestShownCount = 10;

    console.log(tabs);

    /**
     * @todo Load this from external module!
     * @param {array} data __tabs__ general array with all
     * @param {string} input 
     */
    const search = (data, input) => {     
        const replaceLetters = (match, _offset, _string) => {
            const before = "žščřďťňáéíóúíůäëöüľĺŕě".split("");
            const after = "zscrdtnaeiouiuaeoullre".split("");
            const index = before.indexOf(match);
        
            return after[index];
        }

        /**
         * Returns clean url without params
         * @returns {array}
         */
        const cleanUrl = (url) => {
            try {
                const urlObj = new URL(url); // -> zjistit, co udělají about:debugging a další! || performance?
                const protocol = `${urlObj.protocol}//`;

                let output = urlObj.href.substring(protocol.length) // -> "code.visualstudio.com/blogs/2020/05/06/github-issues-integration"
                output = output.split(/\W/); // performance? // ignore special chars / . - etc.

                return output;
            } catch(err){
                console.error(err);
                return [];
            }
        }

        /**
         * 
         * @param {string} string
         * @returns {array} 
         */
        const standardize = (string) => {
            try {
                let output = string.toLowerCase();
                output = output.replace(/[žščřďťňáéíóúíůäëöüľĺŕě]/g, replaceLetters);
                output = output.split(/\W/); // ignore special characters
                output = output.filter(item => item !== ""); // ignore empty strings (from special chars etc.)
            
                return output;
            } catch(err){
                console.error(err);
                return [];
            }
        }

        // standardize data
        let stdInput = standardize(input); // @todo ignore non word chars /\W/
        let output = [];

        console.log(stdInput);

        const performSearch = (data, stdInput) => {
            output = data.filter((item) => {
                const title = standardize(item.title);
                const url = cleanUrl(item.url);
                const string = url + "," + title;
        
                if(stdInput.length > 1){
                    performSearch.call(this, output, stdInput);
                    stdInput.shift();
                } else if(string.includes(stdInput[0])){
                    return true;
                }
            });
        }
        performSearch(data, stdInput);

        return output;
    }

    const getSearchDetailsArray = (data) => {
        const newTabs = data.slice(0);
        const foundItems = [];

        /* 
        For each item from data create an object with:
        { id, url, title, date}

        and sort them by date

        if data = [], then return null or stg
        */

        for(let i=0; i<data.length;i++){
            if(newTabs[i].pinned) continue;

            let output = {};

            let date = new Intl.DateTimeFormat(locale.string, locale.options).format(new Date(newTabs[i].lastAccessed));
            
            output.date = date;
            output.title = newTabs[i].title;
            output.id = newTabs[i].id;
            output.url = newTabs[i].url;

            foundItems.push(output);
        }

        // sort the results by date or relevancy?

        console.log(foundItems);

        return foundItems;
    }

    /**
     * @todo Work on detailed and better filtered return array
     * @param {array} tabs tabs query array 
     * @param {number} numOfLatest optional, is equal to 10 normally 
     */
    const getLatestUsed = (tabs, numOfLatest) => {
        let newTabs = tabs.slice(0);
        let iterationsNum = numOfLatest;
        let latest = [];

        if(tabs.length < iterationsNum) iterationsNum = tabs.length; 

        newTabs.sort((a,b) => a.lastAccessed - b.lastAccessed);

        for(let i=0;i<iterationsNum;i++){
            if(newTabs[i].pinned) continue;

            let output = {};
            let date = new Intl.DateTimeFormat(locale.string, locale.options).format(new Date(newTabs[i].lastAccessed));
            
            output.date = date;
            output.title = newTabs[i].title;
            output.id = newTabs[i].id;
            output.url = newTabs[i].url;

            latest.push(output);
        }

        return latest;
    }

    const getOverview = (tabs) => {
        const tabsOverview = [];

        tabs.forEach(tab => {
            let url = new URL(tab.url);
            let originUrl = url.origin;

            if(originUrl === "null" || url.protocol === "moz-extension:"){
                switch (url.protocol) {
                    case "about:":
                    case "moz-extension:":
                        originUrl = "Browser tabs";
                        break;
                    case "file:":
                        originUrl = "Opened files";
                        break;
                    default:
                        originUrl = "Other tabs";
                        break;
                }
            };
            
            if(!tab.pinned){
                if (tabsOverview.some(website => website.url === originUrl)) {
                    
                    const index = tabsOverview.findIndex( website => website.url === originUrl );

                    tabsOverview[index].count += 1;
                    tabsOverview[index].ids.push(tab.id);
    
                } else {
                    tabsOverview.push({ url: originUrl, count: 1, ids: [ tab.id ] });
                }
            }
        });
        
        tabsOverview.sort((a,b) => b.count-a.count);

        // browser.browserAction.setBadgeText({text: `${tabs.length}`});

        return tabsOverview;
    }

    /**
     * Creates overview list
     * @param {array} tabsOverview 
     * @returns {node} ul#list > li.overview-item*n
     */
    const createOverviewList = (tabsOverview) => {
        return new Promise((resolve, reject) => {
            const ul = document.createElement("ul");
                  ul.setAttribute("id", "list");
        
            for(let i = 0; i < tabsOverview.length; i++){
                let tab = tabsOverview[i];
    
                let text = `<li class="url-${i} overview-item" data-index-number="${i}">
                                <div class="url-container">
                                    <div class="main-item-text-container">
                                        <div class="url" title="${tab.url}">${tab.url}</div>
                                        <div class="count">(${tab.count})</div>
                                    </div>
                                    <div class="item-buttons-container">
                                        <div class="get-in"></div>
                                        <div class="remove hidden" title="Close all tabs with this url"></div>
                                    </div>
                                </div>
                            </li>`;
                
                ul.appendChild(document.createRange().createContextualFragment(text));
            }

            resolve(ul);
        });
    }

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
        const separatorStr = `<div class="separator separator-bottom"></div>`;
        const separator = document.createRange().createContextualFragment(separatorStr);

        return separator;
    }

    /**
     * Creates header for "latest" and "details"
     * @param {number} index id number from __tabsOverview__ array
     * @param {string} type 'latest' or 'details'
     */
    const createHeaderScreen = (index = null, type) => {
        // components: back button, title, ?closeAll, ?search

        const headerTitle = getHeaderTitle(index, type);

        const backBtnStr = `<div class="back go-back" title="Back"></div>`;
        const headerTitleDivStr = `<div class="header-title">${headerTitle}</div>`;
        const closeAllDivStr = type !== "latest" ? `<div class="close-all" data-index-number="${index}" title="Close all listed tabs"></div>` : "";
        const separator = createSeparator(); // node!

        const headerDivStr = `
            <div id="header" class="control">
                ${backBtnStr}
                ${headerTitleDivStr}
                ${closeAllDivStr}
            </div>
        `;

        const headerDiv = document.createRange().createContextualFragment(headerDivStr);
        const header = [headerDiv, separator];

        return header;
    }
    const createHeaderSearch = () => {
        // components: back button, title, ?closeAll, ?search

        const backBtnStr = `<div class="back go-back" title="Back"></div>`;
        const headerTitleDivStr = `
            <div class="header-title">
                <div class="search-container">
                    <input type="search" name="search-input" id="search-input" placeholder="Type here" autofocus="autofocus" />
                    <div class="search-controls">
                        <span class="search-count">10</span>
                        <button class="clear-search">x</button>
                    </div>
                </div>                            
            </div>`;
        // const closeAllDivStr = type !== "latest" ? `<div class="close-all" data-index-number="${index}" title="Close all listed tabs"></div>` : "";
        const separator = createSeparator(); // node!

        const headerDivStr = `
            <div id="header" class="control">
                ${backBtnStr}
                ${headerTitleDivStr}
            </div>
        `;

        const headerDiv = document.createRange().createContextualFragment(headerDivStr);
            //   headerDiv.querySelector("#search-input").autofocus = true;
        const header = [headerDiv, separator];

        return header;
    }

    const createHeaderOverview = () => {
        // Header title
        const windowStr = windows.length > 1 ? " in this window" : "";
        const headerTitleContainerStr = `<div id="header" class="control header-overview"></div>`;
        const headerTitleContainer = document.createRange().createContextualFragment(headerTitleContainerStr);

        const headerTitleStr = `<div class="header-title">
                                    <span>You have <span id="open-tabs-count">${tabs.length}</span> opened tabs${windowStr}.</span>
                                </div>
                                <div id="search-btn">Srch</div>`;
        const headerTitle = document.createRange().createContextualFragment(headerTitleStr);

        headerTitleContainer.firstChild.appendChild(headerTitle);

        // Header link to latest
        const unusedStr = `<div id="ten-unused">
                                <span>${latestShownCount} longest unused tabs</span>
                                <div class="get-in"></div>
                            </div>`;
        const unused = document.createRange().createContextualFragment(unusedStr);

        return [headerTitleContainer, createSeparator(), unused, createSeparator()];
    }
    
    /**
     * Creates screen header component
     * 
     * @param {string} screenId 
     * @param {object} props 
     * @returns {node} <div class="header-container"><!-- Content --></div>
     */
    const createHeader = (screenId, props = {}) => {
        let  { index } = props;
        const headerStr = `<div class="header-container"></div>`;
        const header = document.createRange().createContextualFragment(headerStr);

        let contentArr = [];
        
        switch (screenId) {
            case "overview":
                contentArr = createHeaderOverview();
                break;
            case "search":
                contentArr = createHeaderSearch();
                break;
            case "details":
            case "latest":
                contentArr = createHeaderScreen(index, screenId);
                break;
            default:
                break;
        }

        console.log(contentArr);

        contentArr.forEach(elm => {
            header.firstChild.append(elm);
        });

        setListenersHeader(header, index);

        return header;
    }

    const setListenersHeader = (header, index) => {
        header.firstChild.onclick = async (e) => {
            if(e.target.classList.contains("back")){
                closeScreen();
            }
            if(e.target.closest(".close-all") && index){
                removeTabsFromOverview(index);

                refreshOverviewScreen(); // autoclose
            }
            if(e.target.closest("#ten-unused")){
                const screen = await createScreen("latest");
                const dest = document.querySelector("#main-container");
                renderScreen(screen, dest);
    
                playTransition();
            }
            if(e.target.closest("#search-btn")){
                const screen = await createScreen("search");
                const dest = document.querySelector("#main-container");
                
                setListenersSearch(screen);
                renderScreen(screen, dest);

                playTransition();
            }
        }
    }

    const setListenersSearch = (node) => {
        const inputElm = node.querySelector("#search-input");
        const dest = node.querySelector(".body-container").parentNode;
        let timeout; // waits until next char is typed in before it renders; default 200 ms

        inputElm.addEventListener("keyup", (event) => {
            clearTimeout(timeout);
            timeout = setTimeout(async () => {
                const found = search(tabs, event.target.value);
                const bodyContainer = await createBody("search", {data: found});
                const oldBodyContainer = document.querySelector("#search > .body-container");

                if(oldBodyContainer){
                    oldBodyContainer.remove();
                }

                renderScreen(bodyContainer,dest);
            }, 200);
        });
    }

    const setListenersOverview = (node) => {
        node.onmouseover = (e) => {
            if(e.target.closest("#overview li")){
    
                const parentElm = e.target.closest("li").querySelector(".item-buttons-container");
                parentElm.children[1].classList.remove("hidden");
            }
        }
        node.onmouseout = (e) => {
            if(e.target.closest("#overview li")){
    
                const parentElm = e.target.closest("li").querySelector(".item-buttons-container");
                parentElm.children[0].classList.remove("hidden");
                parentElm.children[1].classList.add("hidden");
            }
        }

        node.onclick = async (e) => {
            if(e.target.classList.contains("remove")){
                const index = e.target.closest("li").dataset.indexNumber;
                removeTabsFromOverview(index);
                console.log("Tabs removed!");
            }
            if( !!e.target.closest(".overview-item") && !e.target.classList.contains("remove")){
                const index = parseInt(e.target.closest("li").dataset.indexNumber);

                const screen = await createScreen("details", { index });
                const dest = document.querySelector("#main-container");
                renderScreen(screen, dest);

                playTransition();
            }
        }
    }

    const playTransition = () => {
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 10);
        }).then(() => {
            document.querySelector("#overview").classList.add("slide-out");
            document.querySelector(".screen:not(#overview)").classList.add("slide-in");
        });
    }

    const setListenersScreen = (node, array) => {
        node.onmouseover = (e) => {
            if(e.target.closest("li.detail")){
    
                const parentElm = e.target.closest("li").querySelector(".item-buttons-container");
                parentElm.children[0].classList.remove("hidden");
                parentElm.children[1].classList.remove("hidden");
                parentElm.children[2].classList.add("hidden");
            }
        }

        node.onmouseout = (e) => {
            if(e.target.closest("li.detail")){
    
                const parentElm = e.target.closest("li").querySelector(".item-buttons-container");
                parentElm.children[0].classList.add("hidden");
                parentElm.children[1].classList.add("hidden");
                parentElm.children[2].classList.remove("hidden");
            }
        }

        node.onclick = (e) => {
            if(e.target.classList.contains("bookmark-close")){
                // bookmark & remove tab
                const id = parseInt(e.target.closest("li").dataset.tabId);
                const arrItem = (array.filter(item => item.id === id))[0];
                const url = arrItem.url;
                const title = arrItem.title;

                bookmarkTab(url, title, id);
                removeTab(e, array);
            }
            if(e.target.classList.contains("remove")){
                removeTab(e, array);
            }
            if(e.target.closest("li") 
                && !e.target.classList.contains("remove") 
                && !e.target.classList.contains("bookmark-close") 
                || e.target.classList.contains("bookmarked")){
    
                // switchTo tab
                const id = parseInt(e.target.closest("li").dataset.tabId);
                browser.tabs.update(id, {active: true});
            }
        }
    }

    /**
     * Creates screen body component (with list of items). Adds list of items to container and returns it, based on its type.
     * 
     * @param {string} screenId 
     * @param {object} props
     * @returns {node} <div class="body-container"><!-- Content of body component - ul --></div>
     */
    const createBody = async (screenId, props = {}) => {
        let { index, data } = props;
        const bodyStr = `<div class="body-container"></div>`;
        const body = document.createRange().createContextualFragment(bodyStr);

        let content = "";
        let dataArr = [];
        
        switch (screenId) {
            case "overview":
                content = await createOverviewList(tabsOverview);
                setListenersOverview(content);
                break;
            case "details":
            case "latest":
                dataArr = getDetailedArray(screenId, {count: latestShownCount, index, data: tabs});
                content = await createList(screenId, dataArr);
                setListenersScreen(content, dataArr);
                break;
            case "search":
                dataArr = getDetailedArray(screenId, {data});
                content = await createList(screenId, dataArr);
                setListenersScreen(content, dataArr);
                break;
            default:
                console.error("Error: body element couldn't be created.");
                break;
        }

        body.firstChild.append(content);

        return body;
    }

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
        const screen = document.createRange().createContextualFragment(screenStr);
        
        const header = createHeader(screenId, props);
        const body = await createBody(screenId, props);

        screen.firstChild.append(header);
        screen.firstChild.append(body);

        console.log(screen);

        return screen;
    }

    /**
     * Appends `screen` (html node) to `dest`
     * 
     * @param {HTML Node} screen Node created by createScreen()
     * @param {HTML Node} dest Node found by querySelector
     */
    const renderScreen = (screen, dest) => {
        // @todo check if dest === node !!

        dest.appendChild(screen);
    }

    /**
     * Handles first run events, creates overview screen and renders it
     */
    const init = async () => {
        tabsOverview = getOverview(tabs);

        const initialDest = document.querySelector("#main-container"); 
        const screen = await createScreen("overview");

        renderScreen(screen, initialDest);
    }

    init();

    /**
     * Use only after removal!
     * @param {string} data id of selected url from tabsOverview
     */
    const refreshOverviewData = async (data) => {
        tabs = await browser.tabs.query({currentWindow: true});
        let currentTabsNum = parseInt(document.querySelector("#open-tabs-count").innerText);
        let tabsNum = tabsOverview[data].ids.length;
        let newTabsNum = currentTabsNum - tabsNum;

        refreshOpenTabsCount(newTabsNum);

        document.querySelector(`li.url-${data}`).remove();
    }

    /**
     * Changes tabs count in header
     * @param {number} newCount 
     */
    const refreshOpenTabsCount = (newCount) => {
        const span = document.querySelector("#open-tabs-count");
        span.innerText = newCount;
    }

    /**
     * Use only after details to overview transition (pressing back button)
     */
    const refreshOverviewScreen = async (props = {}) => {
        let { deletedId = false } = props;

        console.log(deletedId);
        document.querySelector("#overview").classList.add("slide-in-reverse");
        document.querySelector(".screen:not(#overview)").classList.add("slide-out-reverse");

        document.addEventListener("transitionend", () => {
            document.querySelector("#overview").classList = "screen";
        }, { once: true });

        if(deletedId) tabs.splice(tabs.findIndex(tab => tab.id === deletedId), 1);

        tabs = await browser.tabs.query({currentWindow: true});
        tabsOverview = getOverview(tabs);

        const newBodyContainer = await createBody("overview");

        refreshOpenTabsCount(tabs.length);

        document.querySelector(".body-container").remove();
        document.querySelector("#overview").appendChild(newBodyContainer);

        // autoclose function
        document.querySelector(".screen:not(#overview)").remove();
        document.querySelector("#main-container").style.left = "0px";
    }

    /**
     * @param {element} target
     * @param {*} indexNumber tabsOverview index number
     */
    const removeTabsFromOverview = async (indexNumber) => {
        const id = tabsOverview[indexNumber].ids;
        if(id.length > 10) {
            if(confirm(`Are you sure you want to close ${id.length} tabs?`)){
                await browser.tabs.remove(id);
                refreshOverviewData(indexNumber);
            } else return;
        } else {
            await browser.tabs.remove(id);
            refreshOverviewData(indexNumber);
        }
    }

    const getDetailsArray = (index) => {
        const ids = tabsOverview[index].ids;
        let array = [];

        for(let i=0;i<ids.length;i++){
            array.push(... tabs.filter(tab => tab.id === ids[i]));
        }

        array.sort((a, b) => b.lastAccessed-a.lastAccessed)

        return array;
    }

    const addBookmarkStatus = async (item) => {
        const bookmarks = await browser.bookmarks.search({url: item.url});
        const elm = document.querySelector(`li[data-tab-id='${item.id}'] .bookmark`);

        if(bookmarks.length > 0){
            elm.classList.add("bookmarked");
            elm.classList.remove("bookmark-close");
            elm.setAttribute("title", "This url is already bookmarked");
        }
    }

    const bookmarkTab = async (url, title, id) => {
        const isSupportedProtocol = (url) => {
            const supportedProtocols = ["https:", "http:", "ftp:", "file:"];
            const urlObj = new URL(url);

            return supportedProtocols.indexOf(urlObj.protocol) != -1; 
        }

        if(isSupportedProtocol(url)){
            // check if folder exists and create special folder?
            await browser.bookmarks.create({title: title, url: url}).catch(err => console.log(err));
            await browser.browserAction.setIcon({
                path: "../icons/btn-bookmark-star-blue.svg"
            });

            new Promise((resolve, reject) => {
                setTimeout(() => {
                    browser.browserAction.setIcon({});
                    resolve();
                }, 700);
            })
            console.log("New bookmark created");
        }
    }

    /**
     * removeTab() use for removing tabs in detailed screens
     * @param {event} e 
     * @param {array} array detailed array of tabs 
     * @param {boolean} autoclose determines if screen closes with last closed item
     */
    const removeTab = async (e, array, props = {}) => {
        let { autoclose = true } = props;

        // remove tab
        const id = parseInt(e.target.closest("li").dataset.tabId);
                        
        array.splice(array.findIndex(tab => tab.id === id), 1);
        await browser.tabs.remove([id]);

        e.target.closest("li").remove();

        // autoclose
        if(autoclose && array.length === 0){
            refreshOverviewScreen({ deletedId: id });
        }
    }
    
    /**
     * Closes opened screen
     */
    const closeScreen = () => {
        refreshOverviewScreen();
    }

    // Returns headerTitle for secondary screens
    const getHeaderTitle = (id, type) => {
        let headerTitle = "";

        if(type === "details") {
            try {
                headerTitle = (new URL(tabsOverview[id].url)).host;
            } catch (error) {
                headerTitle = tabsOverview[id].url;
            }
        }
        if(type === "latest"){
            headerTitle = `${latestShownCount} longest unused tabs`;
        }

        return headerTitle;
    }

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
        if (type === "details") {
            array = getDetailsArray(index);
        } else if(type === "latest" && count && data) {
            array = getLatestUsed(data, count); // data === __tabs__
        } else if(type === "search" && data){
            array = getSearchDetailsArray(data);
        } else {
            console.log("Error: got wrong params on getDetailedArray()");
        }

        return array;
    }

    const setClass = (type, className) => {
        const dict = {
            details: {
                url: "",
                lastDisplayed: "hidden"
            },
            latest: {
                url: "hidden",
                lastDisplayed: ""
            },
            search: {
                url: "",
                lastDisplayed: "hidden"
            }
        }

        try {
            return dict[type][className];
        } catch (err){
            throw err;
        }
    }

    /**
     * Main function for generating secondary screen lists
     * Replaces showScreen which replaced showLatestDisplayed() and showDetailedScreen()
     * @param {string} type 
     * @returns {node} ul
     */
    const createList = (type, array) => {
        const ul = document.createElement("ul");

        // Fill in with content
        for(let i=0; i < array.length; i++){
            const text = `
            <li id="item-${i}" class="detail" data-tab-id="${array[i].id}">
                <div class="item-container detail">
                    <div class="item-text-container">
                        <div class="title detail" title="${array[i].title}">${array[i].title}</div>
                        <div class="url detail ${setClass(type, "url")}" title="${array[i].url}">${array[i].url}</div>
                        <div class="last-displayed detail ${setClass(type, "lastDisplayed")}" title="${array[i].date}">${array[i].date}</div>
                    </div>
                    <div class="item-buttons-container">
                        <div class="bookmark bookmark-close detail hidden" title="Bookmark and close tab"></div>
                        <div class="remove detail hidden" title="Close tab"></div>
                        <div class="get-in"></div>
                    </div>
                </div>
            </li>
            `;

            ul.appendChild(document.createRange().createContextualFragment(text));
            addBookmarkStatus(array[i]);
        }

        if(type === "search" && array.length === 0){
            const text = `
            <li id="nothing-to-show">
                <div class="item-container error">
                    Nothing to display. Either nothing was found or the search hasn't started yet.
                </div>
            </li>
            `;

            ul.appendChild(document.createRange().createContextualFragment(text));
        }

        return ul;
    }
})();
