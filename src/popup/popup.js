(async () => {
    const locale = {
        string: "cs-CZ",
        options: {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric' 
        }
    }

    let tabs = await browser.tabs.query({currentWindow: true});
    let tabsOverview = []; // fills with getOverview
    const anchorMain = document.querySelector("#main");
    const anchorHeader = document.querySelector("#header");

    anchorHeader.innerHTML = `<span>You have <span id="open-tabs-count">${tabs.length}</span> opened tabs.</span>`;

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

        return tabsOverview;
    }
    tabsOverview = getOverview(tabs);

    const getOverviewList = (tabsOverview) => {
        const ul = document.createElement("ul");
              ul.setAttribute("id", "list");
    
        for(let i = 0; i < tabsOverview.length; i++){
            let tab = tabsOverview[i];
            let li = document.createElement("li");
                li.classList.add(`url-${i}`);
                li.setAttribute("data-index-number", i);
    
            let container = document.createElement("div");
                container.classList.add("url-container");
    
            let textDiv = document.createElement("div");
                textDiv.classList.add("url");
                textDiv.setAttribute("title", tab.url);
                textDiv.innerText = tab.url;
    
            let countDiv = document.createElement("div");
                countDiv.classList.add("count");
                countDiv.innerText = `(${tab.count})`;
    
            let closeButton = document.createElement("div");
                closeButton.classList.add("remove");
                closeButton.setAttribute("title", "Close all tabs with this url");
                // closeButton.innerHTML = '&#10799;';
    
            container.appendChild(textDiv);
            container.appendChild(countDiv);
            container.appendChild(closeButton);
            
            li.appendChild(container);
            ul.appendChild(li);
        }

        return ul;
    }

    anchorMain.appendChild(getOverviewList(tabsOverview));

    /**
     * Use only after removal!
     * @param {string} data id of selected url from tabsOverview
     */
    const refreshOverviewData = (data) => {
        let currentTabsNum = parseInt(document.querySelector("#open-tabs-count").innerText);
        let tabsNum = tabsOverview[data].ids.length;
        let newTabsNum = currentTabsNum - tabsNum;

        document.querySelector(`li.url-${data}`).remove();
        document.querySelector(`#header > span`).innerHTML = `You have <span id="open-tabs-count">${newTabsNum}</span> opened tabs.`;
    }

    /**
     * Use only after details to overview transition (pressing back button)
     */
    const refreshOverviewScreen = async () => {
        document.querySelector("#main-container").classList.add("slide-in-reverse");
        document.querySelector("#details").classList.add("slide-out-reverse");
        
        document.addEventListener("transitionend", () => {
            document.querySelector("#main-container").classList = "";
        }, { once: true });
        
        tabs = await browser.tabs.query({currentWindow: true});
        tabsOverview = getOverview(tabs);

        anchorHeader.innerHTML = `<span>You have <span id="open-tabs-count">${tabs.length}</span> opened tabs.</span>`;

        anchorMain.removeChild(anchorMain.firstChild);
        anchorMain.appendChild(getOverviewList(tabsOverview));
    }

    const removeTabs = (target) => {
        const data = target.closest("li").dataset.indexNumber;
        const id = tabsOverview[data].ids;
        if(id.length > 10) {
            if(confirm(`Are you sure you want to close ${id.length} tabs?`)){
                browser.tabs.remove(id);
                refreshOverviewData(data);
            } else return;
        } else {
            browser.tabs.remove(id);
            refreshOverviewData(data);
        }
    }

    const getDetails = (target) => {
        const index = target.closest("li").dataset.indexNumber;
        const ids = tabsOverview[index].ids;
        let array = [];

        for(let i=0;i<ids.length;i++){
            array.push(... tabs.filter(tab => tab.id === ids[i]));
        }

        array.sort((a, b) => b.lastAccessed-a.lastAccessed)

        return array;
    }

    const createSlideScreen = (headerTitle) => {
        const headerDiv = `<div id="header" class="control"><div class="back go-back" title="Back"></div>
                        <div class="header-title">${headerTitle}</div></div>
                        <div class="separator separator-bottom"></div>`;

        const mainDetailsDiv = document.createElement("main");
              mainDetailsDiv.setAttribute("id", "details");
              mainDetailsDiv.innerHTML = headerDiv;

        const ul = document.createElement("ul");
        const ulContainer = document.createElement("div");
              ulContainer.classList.add("ul-container");

        ulContainer.appendChild(ul);
        mainDetailsDiv.appendChild(ulContainer);

        return mainDetailsDiv;
    }

    /**
     * @param {DOM target} target 
     */
    const showLatestDisplayed = (target, numOfLatest = 10) => {
        const array = getLatestUsed(tabs, numOfLatest);
        let headerTitle = `${numOfLatest} longest unused tabs`;

        const screen = createSlideScreen(headerTitle);
        const ul = screen.querySelector("ul");

        // Fill in with content
        for (let i = 0; i < array.length; i++) {
            const text = `
                <li id="item-${i}" class="detail" data-tab-id="${array[i].id}">
                    <div class="item-container detail">
                        <div class="title detail" title="${array[i].title}">${array[i].title}</div>
                        <div class="url detail hidden" title="${array[i].url}">${array[i].url}</div>
                        <div class="last-displayed detail" title="${array[i].date}">${array[i].date}</div>
                        <div class="remove detail" title="Close tab"></div>
                    </div>
                </li>
                `;

            ul.innerHTML += text;
        }

        // Set up events
        screen.onclick = (e) => {
            if(e.target.classList.contains("back")){

                refreshOverviewScreen();

                document.querySelector("#details").remove();
                document.querySelector("#main-container").style.left = "0px";
            }
            if(e.target.classList.contains("remove")){
                // remove tab
                const id = parseInt(e.target.closest("li").dataset.tabId);
                browser.tabs.remove([id]);
                e.target.closest("li").remove();
            }
            if(e.target.closest("li") && !e.target.classList.contains("remove")){
                // switchTo tab
                const id = parseInt(e.target.closest("li").dataset.tabId);
                browser.tabs.update(id, {active: true});
            }
        }

        document.querySelector("body").appendChild(screen);
    }

    const showDetailsScreen = (target) => {
        const array = getDetails(target);
        let headerTitle = "";

        console.log(target.innerText);

        try {
            headerTitle = (new URL(target.innerText)).host;
        } catch (error) {
            headerTitle = target.innerText;
        }
        
        const screen = createSlideScreen(headerTitle);
        const ul = screen.querySelector("ul");

        // Fill in with content
        for(let i=0; i < array.length; i++){
            const text = `
            <li id="item-${i}" class="detail" data-tab-id="${array[i].id}">
                <div class="item-container detail">
                    <div class="title detail" title="${array[i].title}">${array[i].title}</div>
                    <div class="url detail" title="${array[i].url}">${array[i].url}</div>
                    <div class="remove detail" title="Close tab"></div>
                </div>
            </li>
            `;

            ul.innerHTML += text;
        }

        // Set up events
        screen.onclick = (e) => {
            if(e.target.classList.contains("back")){
                refreshOverviewScreen();

                document.querySelector("#details").remove();
                document.querySelector("#main-container").style.left = "0px";
            }
            if(e.target.classList.contains("remove")){
                // remove tab
                const id = parseInt(e.target.closest("li").dataset.tabId);
                browser.tabs.remove([id]);
                e.target.closest("li").remove();
            }
            if(e.target.closest("li") && !e.target.classList.contains("remove")){
                // switchTo tab
                const id = parseInt(e.target.closest("li").dataset.tabId);
                browser.tabs.update(id, {active: true});
            }
        }
        
        document.querySelector("body").appendChild(screen);
    }

    document.querySelector("#main-container").onclick = (e) => {
        // console.log(e.target);

        if(e.target.classList.contains("remove")){
            removeTabs(e.target);
            console.log("Tabs removed!");
        }
        if( e.target.closest("div.url-container") && !e.target.classList.contains("remove")){
            // getDetails(e.target);
            const target = e.target.closest("div.url-container");

            showDetailsScreen(target.firstChild);
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
            showLatestDisplayed(e.target);

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

    browser.theme.getCurrent().then((a) => {
        console.log(a);
    });

    getLatestUsed(tabs);
    
})();
