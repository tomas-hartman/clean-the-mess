(async () => {
    const locale = {
        string: "cs-CZ",
        options: {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric' 
        }
    }

    let tabs = await browser.tabs.query({currentWindow: true});
    console.log(tabs);
    const windows = await browser.windows.getAll();
    let tabsOverview = []; // fills with getOverview
    const anchorMain = document.querySelector("#main");
    const anchorHeader = document.querySelector("#header");
    const windowStr = windows.length > 1 ? " in this window" : "";
    const openedTabsStr = `<span>You have <span id="open-tabs-count">${tabs.length}</span> opened tabs${windowStr}.</span>`;

    anchorHeader.appendChild(document.createRange().createContextualFragment(openedTabsStr));

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
    tabsOverview = getOverview(tabs);

    const getOverviewList = (tabsOverview) => {
        const ul = document.createElement("ul");
              ul.setAttribute("id", "list");
    
        for(let i = 0; i < tabsOverview.length; i++){
            let tab = tabsOverview[i];

            let text = `<li class="url-${i}" data-index-number="${i}">
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

        return ul;
    }

    anchorMain.appendChild(getOverviewList(tabsOverview));

    /**
     * Use only after removal!
     * @param {string} data id of selected url from tabsOverview
     */
    const refreshOverviewData = async (data) => {
        tabs = await browser.tabs.query({currentWindow: true});
        let currentTabsNum = parseInt(document.querySelector("#open-tabs-count").innerText);
        let tabsNum = tabsOverview[data].ids.length;
        let newTabsNum = currentTabsNum - tabsNum;
        const openedTabsStr = `<span>You have <span id="open-tabs-count">${newTabsNum}</span> opened tabs${windowStr}.</span>`

        document.querySelector(`li.url-${data}`).remove();

        anchorHeader.firstChild.remove();
        anchorHeader.appendChild(document.createRange().createContextualFragment(openedTabsStr));
    }

    /**
     * Use only after details to overview transition (pressing back button)
     */
    const refreshOverviewScreen = async ({ deletedId } = {}) => {
        document.querySelector("#main-container").classList.add("slide-in-reverse");
        document.querySelector("#details").classList.add("slide-out-reverse");
        
        document.addEventListener("transitionend", () => {
            document.querySelector("#main-container").classList = "";
        }, { once: true });

        if(deletedId) tabs.splice(tabs.findIndex(tab => tab.id === deletedId), 1);

        // tabs.remove() is async
        tabs = await browser.tabs.query({currentWindow: true});
        tabsOverview = getOverview(tabs);

        const openedTabsStr = `<span>You have <span id="open-tabs-count">${tabs.length}</span> opened tabs${windowStr}.</span>`

        anchorHeader.firstChild.remove();
        anchorHeader.appendChild(document.createRange().createContextualFragment(openedTabsStr));

        anchorMain.removeChild(anchorMain.firstChild);
        anchorMain.appendChild(getOverviewList(tabsOverview));
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

    const getDetailsArray = (target) => {
        const index = target.closest("li").dataset.indexNumber;
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
        const closeAllDiv = `<div class="close-all" data-index-number="${index}" title="Close all listed tabs"></div>`;
        const closeAll = index ? closeAllDiv : "";
        const headerDivStr = `<div id="header" class="control">
                                <div class="back go-back" title="Back"></div>
                        <div class="header-title">${headerTitle}</div>
                        ${closeAll}</div>
                        <div class="separator separator-bottom"></div>`;
        const headerDiv = document.createRange().createContextualFragment(headerDivStr);

        const mainDetailsDiv = document.createElement("main");
              mainDetailsDiv.setAttribute("id", "details");
              mainDetailsDiv.appendChild(headerDiv);

        const ul = document.createElement("ul");
        const ulContainer = document.createElement("div");
              ulContainer.classList.add("ul-container");

        ulContainer.appendChild(ul);
        mainDetailsDiv.appendChild(ulContainer);

        return mainDetailsDiv;
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

            document.querySelector("#details").remove();
            document.querySelector("#main-container").style.left = "0px";
        }
    }

    /**
     * Closes opened screen
     */
    const closeScreen = () => {
        refreshOverviewScreen();

        document.querySelector("#details").remove();
        document.querySelector("#main-container").style.left = "0px";
    }

    /**
     * Returns headerTitle for secondary screens
     * @param {string} type normal | latest | ??? 
     * @param {*} param1 
     * @returns {string} headerTitle
     */
    const getHeaderTitle = (type, {target, count} = {}) => {
        let headerTitle = "";
        if(type === "normal" && target){
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

    /**
     * Returns sorted/reduced array for detailed secondary screens
     * @param {string} type normal | latest | ??? 
     * @param {*} param1 
     */
    const getDetailedArray = (type, {target, count} = {}) => {
        let array = [];
        if (type === "normal" && target) {
            array = getDetailsArray(target);
        } else if(type === "latest" && count) {
            array = getLatestUsed(tabs, count);
        } else {
            console.log("Error: got wrong params on getDetailedArray()");
        }

        return array;
    }

    const setClass = (type, className) => {
        const dict = {
            normal: {
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

     /**
      * Main function for generating secondary screens
      * Replaces showLatestDisplayed() and showDetailedScreen()
      * @param {DOM target} target 
      * @param {number} [latestCount = 10] Number of latest shown
      * @param {string} [type = "normal"] normal | latest | ??? 
      */
    const showScreen = (target, {latestCount = 10, type = "normal"} = {}) => {
        const array = getDetailedArray(type, {count: latestCount, target: target});
        const headerTitle = getHeaderTitle(type, {count: latestCount, target: target});

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
            if(e.target.classList.contains("back")){
                closeScreen();
            }
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
            if(e.target.closest(".close-all")){
                const index = e.target.closest(".close-all").dataset.indexNumber;
                removeTabsFromOverview(index);

                // autoclose
                refreshOverviewScreen();

                document.querySelector("#details").remove();
                document.querySelector("#main-container").style.left = "0px";
            }
        }
        
        document.querySelector("body").appendChild(screen);
    }

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
    document.querySelector("#main-container").onclick = (e) => {
        if(e.target.classList.contains("remove")){
            const index = e.target.closest("li").dataset.indexNumber;
            removeTabsFromOverview(index);
            console.log("Tabs removed!");
        }
        if( e.target.closest("div.url-container") && !e.target.classList.contains("remove")){
            const target = e.target.closest("div.url-container");

            showScreen(target, {type: "normal"})
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 10);
            }).then(() => {
                document.querySelector("#main-container").classList.add("slide-out");
                document.querySelector("#details").classList.add("slide-in");
            });

            console.log("clicked");
        }
        if(e.target.closest("#ten-unused")){
            showScreen(e.target, {type: "latest"});

            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 10);
            }).then(() => {
                document.querySelector("#main-container").classList.add("slide-out");
                document.querySelector("#details").classList.add("slide-in");
            });
        }
    }
})();
