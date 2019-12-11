(async () => {
    const tabs = await browser.tabs.query({currentWindow: true});
    const tabsCountInfo = [];
    const anchorMain = document.querySelector("#main");
    const anchorHeader = document.querySelector("#header");

    anchorHeader.innerHTML = `<span>You have <span id="open-tabs-count">${tabs.length}</span> opened tabs.</span>`;
    // console.log();
    console.log(tabs);

    tabs.forEach(tab => {
        let url = new URL(tab.url);
        
        if(!tab.pinned){
            if (tabsCountInfo.some(website => website.url === url.origin)) {
                
                const index = tabsCountInfo.findIndex( website => website.url === url.origin );
                tabsCountInfo[index].count += 1;
                tabsCountInfo[index].ids.push(tab.id);

            } else {
                tabsCountInfo.push({ url: url.origin, count: 1, ids: [ tab.id ] });
            }
        }

    });
    
    tabsCountInfo.sort((a,b) => b.count-a.count);

    const ul = document.createElement("ul");
    ul.setAttribute("id", "list");
    anchorMain.appendChild(ul);
    const anchorUl = document.getElementById("list");


    for(let i = 0; i < tabsCountInfo.length; i++){
        let tab = tabsCountInfo[i];
        let li = document.createElement("li");
            li.classList.add(`url-${i}`);
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
            closeButton.setAttribute("data-index-number", i);
            closeButton.innerHTML = '&#10799;';

        container.appendChild(textDiv);
        container.appendChild(countDiv);
        container.appendChild(closeButton);
        
        li.appendChild(container);
        ul.appendChild(li);
    }

    const refreshData = (data) => {
        let currentTabsNum = parseInt(document.querySelector("#open-tabs-count").innerText);
        let tabsNum = tabsCountInfo[data].ids.length;
        let newTabsNum = currentTabsNum - tabsNum;

        document.querySelector(`li.url-${data}`).remove();
        document.querySelector(`#header > span`).innerHTML = `You have <span id="open-tabs-count">${newTabsNum}</span> opened tabs.`;
    }

    const removeTabs = (data) => {
        const id = tabsCountInfo[data].ids;
        if(id.length > 10) {
            if(confirm(`Are you sure you want to close ${id.length} tabs?`)){
                browser.tabs.remove(id);
                refreshData(data);
            } else return;
        } else {
            browser.tabs.remove(id);
            refreshData(data);
        }
    }

    document.addEventListener("click", (e) => {
        if(e.target.className === "remove"){
            // sessions.restore()
            removeTabs(e.target.dataset.indexNumber);
            console.log("Tabs removed!");
        }
    });


    // browser.tabs.remove(tabsCountInfo[35].ids); 
    // document.write(tabUrlsArr);
    console.log(tabsCountInfo);
    
})();
// main();
