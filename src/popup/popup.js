(async () => {
    const tabs = await browser.tabs.query({currentWindow: true});
    const tabsCountInfo = [];
    const anchorMain = document.querySelector("#main");
    const anchorHeader = document.querySelector("#header");

    anchorHeader.innerText = `You have ${tabs.length} opened tabs.`;
    // console.log();
    console.log(tabs);

    tabs.forEach(tab => {
        let url = new URL(tab.url);
        
        if (tabsCountInfo.some(website => website.url === url.origin)) {
            
            const index = tabsCountInfo.findIndex( website => website.url === url.origin );
            tabsCountInfo[index].count += 1;
            tabsCountInfo[index].ids.push(tab.id);

        } else {
            tabsCountInfo.push({ url: url.origin, count: 1, ids: [ tab.id ] });
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

        li.innerText = `${tab.url} (${tab.count})`;

        ul.appendChild(li);
    }


    // browser.tabs.remove(tabsCountInfo[35].ids); 
    // document.write(tabUrlsArr);
    console.log(tabsCountInfo);

    console.log(set);
    
})();
// main();
