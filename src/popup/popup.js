(async () => {
    let tabs = await browser.tabs.query({currentWindow: true});
    let tabsOverview = []; // fills with getOverview
    const anchorMain = document.querySelector("#main");
    const anchorHeader = document.querySelector("#header");

    anchorHeader.innerHTML = `<span>You have <span id="open-tabs-count">${tabs.length}</span> opened tabs.</span>`;
    console.log(tabs);

    const getOverview = (tabs) => {
        const tabsOverview = [];

        tabs.forEach(tab => {
            let url = new URL(tab.url);
            
            if(!tab.pinned){
                if (tabsOverview.some(website => website.url === url.origin)) {
                    
                    const index = tabsOverview.findIndex( website => website.url === url.origin );
                    tabsOverview[index].count += 1;
                    tabsOverview[index].ids.push(tab.id);
    
                } else {
                    tabsOverview.push({ url: url.origin, count: 1, ids: [ tab.id ] });
                }
            }
        });
        
        tabsOverview.sort((a,b) => b.count-a.count);

        return tabsOverview;
    }
    tabsOverview = getOverview(tabs);

    console.log(tabsOverview);

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
                textDiv.innerText = tab.url;
    
            let countDiv = document.createElement("div");
                countDiv.classList.add("count");
                countDiv.innerText = `(${tab.count})`;
    
            let closeButton = document.createElement("div");
                closeButton.classList.add("remove");
                closeButton.innerHTML = '&#10799;';
    
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

    const showDetailsScreen = (target) => {
        /* position: absolute; background-color: blue; height: 100%; */
        // animace
        document.querySelector(".main-container").style.left = "-350px";
        let headerTitle = "";

        try {
            headerTitle = (new URL(target.innerText)).host; 
        } catch (error) {
            headerTitle = "null";
        }
        
        const array = getDetails(target);

        const headerDiv = `<div id="header" class="control"><div class="back">&lt;</div>
                        <div class="header-title">${headerTitle}</div></div>
                        <div class="separator separator-bottom"></div>`;
        /**
         * create div main-details
         */
        const mainDetailsDiv = document.createElement("main");
              mainDetailsDiv.setAttribute("id", "details");
              mainDetailsDiv.style = "position: absolute; height: 100%; width:100%; margin-top: 4px;";
              mainDetailsDiv.innerHTML = headerDiv;

        const ul = document.createElement("ul");
        const ulContainer = document.createElement("div");
              ulContainer.classList.add("ul-container");

        for(let i=0; i < array.length; i++){
            const text = `
            <li id="item-${i}" class="detail" data-tab-id="${array[i].id}">
                <div class="item-container detail">
                    <div class="title detail">${array[i].title}</div>
                    <div class="url detail">${array[i].url}</div>
                    <div class="remove detail">⨯</div>
                </div>
            </li>
            `;

            ul.innerHTML += text;
        }
        
        ulContainer.appendChild(ul);
        mainDetailsDiv.appendChild(ulContainer);

        mainDetailsDiv.onclick = (e) => {
            if(e.target.classList.contains("back")){
                /**
                 * @todo Scratch, would need to reload previous page after deleted items and so on
                 * @todo animate
                 */
                refreshOverviewScreen();

                document.querySelector("#details").remove();
                document.querySelector(".main-container").style.left = "0px";
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
        
        document.querySelector("body").appendChild(mainDetailsDiv);
    }

    document.querySelector("#main").onclick = (e) => {
        console.log(e.target);

        if(e.target.classList.contains("remove")){
            removeTabs(e.target);
            console.log("Tabs removed!");
        }
        if( e.target.closest("div.url-container") && !e.target.classList.contains("remove")){
            // getDetails(e.target);
            showDetailsScreen(e.target);
            console.log("clicked");
        }
    }


    // browser.tabs.remove(tabsOverview[35].ids); 
    // document.write(tabUrlsArr);
    console.log(tabsOverview);
    
})();
