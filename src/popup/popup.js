(async () => {
    const tabs = await browser.tabs.query({currentWindow: true});
    const tabsCountInfo = [];
    const anchorMain = document.querySelector("#main");
    const anchorHeader = document.querySelector("#header");

    anchorHeader.innerHTML = `<span>You have ${tabs.length} opened tabs.</span>`;
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

    const closeTabs = (id) => {
        if(id.length > 10 && confirm(`Are you sure you want to close ${id.length} tabs?`)) {
            browser.tabs.remove(id);
        } else browser.tabs.remove(id);
    }

    document.addEventListener("click", (e) => {
        if(e.target.className === "remove"){
            // sessions.restore()
            closeTabs(tabsCountInfo[e.target.dataset.indexNumber].ids);
            console.log("Tabs removed!");
        }
    });


    // browser.tabs.remove(tabsCountInfo[35].ids); 
    // document.write(tabUrlsArr);
    console.log(tabsCountInfo);
    
})();
// main();
