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
     * @todo Work on detailed and better filtered return array
     * @param {array} tabs tabs query array 
     * @param {number} numOfLatest optional, is equal to 10 normally 
     */
    const getLatestUsed = (tabs, numOfLatest = 10) => {
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

    const createHeaderOverview = () => {
        // Header title
        const windowStr = windows.length > 1 ? " in this window" : "";
        const headerTitleContainerStr = `<div class="header-title"></div>`;
        const headerTitleContainer = document.createRange().createContextualFragment(headerTitleContainerStr);

        const headerTitleStr = `<span>You have <span id="open-tabs-count">${tabs.length}</span> opened tabs${windowStr}.</span>`;
        const headerTitle = document.createRange().createContextualFragment(headerTitleStr);

        headerTitleContainer.firstChild.appendChild(headerTitle);

        // Header link to latest
        const unusedStr = `<div id="ten-unused">
                                <span>10 longest unused tabs</span>
                                <div class="get-in"></div>
                            </div>`;
        const unused = document.createRange().createContextualFragment(unusedStr);

        return [headerTitleContainer, createSeparator(), unused, createSeparator()];
    }

    /**
     * Creates screen header component
     * returns node
     */
    const createHeader = (screenId, props = {}) => {
        // <div class="header-container"><!-- Content --></div>
        // Zde se generuje header v závislosti na typu screeny
        // returns header;

        let  { index } = props;

        console.log(index);

        const headerStr = `<div class="header-container"></div>`;
        const header = document.createRange().createContextualFragment(headerStr);

        let contentArr = [];
        
        switch (screenId) {
            case "overview":
                contentArr = createHeaderOverview();
                break;
            case "details":
                contentArr = createHeaderScreen(index, screenId);
                break;
            case "latest":
                contentArr = ["ahoj"];
                break;
            default:
                break;
        }

        contentArr.forEach(elm => {
            header.firstChild.append(elm);
        });

        // listeners!
        header.firstChild.onclick = (e) => {
            if(e.target.classList.contains("back")){
                closeScreen();
            }
            if(e.target.closest(".close-all") && index){
                // const index = e.target.closest(".close-all").dataset.indexNumber;
                removeTabsFromOverview(index);

                // autoclose
                refreshOverviewScreen();
            }
        }



        return header;
    }

    /**
     * Creates screen body component (with list of items)
     * returns node
     */
    const createBody = async (screenId, props = {}) => {
        // <div class="body-container"><!-- Content of body component - list --></div>
        // Zde se přidávají rendering listy k jednotlivým typům
        // returns body;

        let { index } = props;

        const bodyStr = `<div class="body-container"></div>`;
        const body = document.createRange().createContextualFragment(bodyStr);

        let content = "";
        
        switch (screenId) {
            case "overview":
                content = await createOverviewList(tabsOverview);
                break;
            case "details":
                // TODO
                content = await createList(screenId, index);
                break;
            case "latest":
                // TODO
                content = await createOverviewList(tabsOverview);
                break;
        
            default:
                break;
        }

        body.firstChild.append(content);

        // listeners
        // TODO

        return body;
    }


    /**
     * Creates HTML Node with screen, that can be rendered with renderScreen
     * returns node
     */
    const createScreen = async (screenId, props = {}) => {
        // <div id="overview" class="screen"></div>
        // append: header, append: body
        // return screen;

        console.log(props);

        const screenStr = `<div id="${screenId}" class="screen"></div>`;
        const screen = document.createRange().createContextualFragment(screenStr);
        
        const header = createHeader(screenId, props);
        const body = await createBody(screenId, props);

        screen.firstChild.append(header);
        screen.firstChild.append(body);

        return screen;
    }

    /**
     * .slide-out -> div#overview
     * .slide-in -> #details
     * .slide-out -> position: relative
     */

    /**
     * Appends `screen` (html node) to `dest`
     * @param {HTML Node} screen Node created by createScreen()
     * @param {HTML Node} dest Node found by querySelector
     */
    const renderScreen = (screen, dest) => {
        // appends screen to where it should be
        // check if dest === node !!

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
     * Změní číslo v headeru
     * @param {number} newCount 
     */
    const refreshOpenTabsCount = (newCount) => {
        const span = document.querySelector("#open-tabs-count");
        span.innerText = newCount;
    }

    /**
     * Use only after details to overview transition (pressing back button)
     */
    const refreshOverviewScreen = async ({ deletedId } = {}) => {
        document.querySelector("#overview").classList.add("slide-in-reverse");
        document.querySelector("#details").classList.add("slide-out-reverse");

        document.addEventListener("transitionend", () => {
            // @todo which class I remove?
            document.querySelector("#overview").classList = "";
        }, { once: true });

        if(deletedId) tabs.splice(tabs.findIndex(tab => tab.id === deletedId), 1);

        tabs = await browser.tabs.query({currentWindow: true});
        tabsOverview = getOverview(tabs);

        const newBodyContainer = await createBody("overview");

        refreshOpenTabsCount(tabs.length);

        document.querySelector(".body-container").remove();
        document.querySelector("#overview").appendChild(newBodyContainer);

        // autoclose function
        // document.querySelector(".screen").remove();
        document.querySelector("#details").remove();
        document.querySelector("#main-container").style.left = "0px";
    }

    /**
     * @todo přepsat - vykleštit closest li
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
        // const index = target.closest("li").dataset.indexNumber;

        console.log(index);

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
            // TBA After design is ready
            elm.classList.add("bookmarked");
            elm.classList.remove("bookmark-close");
            elm.setAttribute("title", "This url is already bookmarked");
        }
    }

    /* 
    New: createSlideScreebBody = (header)
    */
    const createSlideScreenBody = (headerTitle, index) => {
        // const closeAllDiv = `<div class="close-all" data-index-number="${index}" title="Close all listed tabs"></div>`;
        // const closeAll = index ? closeAllDiv : "";
        // const headerDivStr = `<div id="header" class="control">
        //                         <div class="back go-back" title="Back"></div>
        //                 <div class="header-title">${headerTitle}</div>
        //                 ${closeAll}</div>
        //                 <div class="separator separator-bottom"></div>`;
        // const headerDiv = document.createRange().createContextualFragment(headerDivStr);

        // const mainDetailsDiv = document.createElement("div");
        //       mainDetailsDiv.setAttribute("id", "details");
        //       mainDetailsDiv.setAttribute("class", "screen");
        //       mainDetailsDiv.appendChild(headerDiv);

        // const ul = document.createElement("ul");
        // const ulContainer = document.createElement("div");
        //       ulContainer.classList.add("ul-container");

        // ulContainer.appendChild(ul);
        // mainDetailsDiv.appendChild(ulContainer);

        // console.log(mainDetailsDiv);

        // return mainDetailsDiv;
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
    const removeTab = async (e, array, { autoclose = true } = {}) => {
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

    /**
     * Returns headerTitle for secondary screens
     * @param {string} type normal | latest | ??? 
     * @param {*} param1 
     * @returns {string} headerTitle
     */
    const _getHeaderTitle = (type, {target, count} = {}) => {
        let headerTitle = "";
        if(type === "details" && target){
            try {
                headerTitle = (new URL(target.querySelector('.url').innerText)).host;
            } catch (error) {
                headerTitle = target.querySelector('.url').innerText;
            }
        } else if (type === "latest" && count) {
            headerTitle = `${count} longest unused tabs`;
        } else {
            console.log("Error: got wrong params on getHeaderTitle()");
        }

        return headerTitle;
    }

    // NEW
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
     * @param {string} type normal | latest | ??? 
     * @param {*} param1 
     */
    const getDetailedArray = (type, props = {}) => {
        let { count, index } = props;

        let array = [];
        if (type === "details") {
            array = getDetailsArray(index);
        } else if(type === "latest" && count) {
            array = getLatestUsed(tabs, count);
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
            }
        }

        try {
            return dict[type][className];
        } catch (err){
            throw err;
        }
    }


    const createList = (type, index) => {

        console.log(index);

        const array = getDetailedArray(type, {count: latestShownCount, index});
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

        return ul;
    }

     /**
      * Main function for generating secondary screens
      * Replaces showLatestDisplayed() and showDetailedScreen()
      * @param {DOM target} target 
      * @param {number} [latestCount = 10] Number of latest shown
      * @param {string} [type = "normal"] normal | latest | ??? 
      */
    const _showScreen = (target, {latestCount = 10, type = "normal"} = {}) => {
        const array = getDetailedArray(type, {count: latestCount, target: target});
        const headerTitle = _getHeaderTitle(type, {count: latestCount, target: target});

        const index = !!target.closest("li") && target.closest("li").dataset.indexNumber;

        const screen = createSlideScreenBody(headerTitle, index);
        const ul = screen.querySelector("ul");
    
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

        // Set up events
        screen.onmouseover = (e) => {
            if(e.target.closest("li")){
    
                const parentElm = e.target.closest("li").querySelector(".item-buttons-container");
                parentElm.children[0].classList.remove("hidden");
                parentElm.children[1].classList.remove("hidden");
                parentElm.children[2].classList.add("hidden");
            }
        }
        screen.onmouseout = (e) => {
            if(e.target.closest("li")){
    
                const parentElm = e.target.closest("li").querySelector(".item-buttons-container");
                parentElm.children[0].classList.add("hidden");
                parentElm.children[1].classList.add("hidden");
                parentElm.children[2].classList.remove("hidden");
            }
        }

        screen.onclick = (e) => {
            // if(e.target.classList.contains("back")){
            //     closeScreen();
            // }
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
            // if(e.target.closest(".close-all")){
            //     const index = e.target.closest(".close-all").dataset.indexNumber;
            //     removeTabsFromOverview(index);

            //     // autoclose
            //     refreshOverviewScreen();
            // }
        }
        
        const destination = document.querySelector("#main-container");
        renderScreen(screen, destination);
        // document.querySelector("#main-container").appendChild(screen);
    }

    // LISTENERS
    // @todo rewrite
    document.querySelector("#main-container").onmouseover = (e) => {
        if(e.target.closest("li")){

            const parentElm = e.target.closest("li").querySelector(".item-buttons-container");
            parentElm.children[1].classList.remove("hidden");
        }
    }
    document.querySelector("#main-container").onmouseout = (e) => {
        if(e.target.closest("li")){

            const parentElm = e.target.closest("li").querySelector(".item-buttons-container");
            parentElm.children[0].classList.remove("hidden");
            parentElm.children[1].classList.add("hidden");
        }
    }
    document.querySelector("#main-container").onclick = async (e) => {
        if(e.target.classList.contains("remove")){
            const index = e.target.closest("li").dataset.indexNumber;
            removeTabsFromOverview(index);
            console.log("Tabs removed!");
        }
        if( !!e.target.closest(".overview-item") && !e.target.classList.contains("remove")){
            const target = e.target.closest("div.url-container");

            const index = parseInt(e.target.closest("li").dataset.indexNumber);
            console.log(index);

            // new way
            const screen = await createScreen("details", { index });
            const dest = document.querySelector("#main-container");
            renderScreen(screen, dest);

            // showScreen(target, {type: "normal"}); // old way

            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 10);
            }).then(() => {
                document.querySelector("#overview").classList.add("slide-out");
                document.querySelector("#details").classList.add("slide-in");
            });

            console.log("clicked");
        }
        if(e.target.closest("#ten-unused")){
            // new way
            const screen = await createScreen("latest");
            const dest = document.querySelector("#main-container");
            renderScreen(screen, dest);

            // _showScreen(e.target, {type: "latest"});

            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 10);
            }).then(() => {
                document.querySelector("#overview").classList.add("slide-out");
                document.querySelector("#details").classList.add("slide-in");
            });
        }
    }
})();
