(async () => {
    const tabs = await browser.tabs.query({currentWindow: true});
    const tabUrlsArr = [];
    const tabsCountInfo = [];
    // const anchor = document.querySelector("body");

    console.log(`You have ${tabs.length} tabs opened.`);
    console.log(tabs);
    let i = 0;
    let y = 0;

    tabs.forEach(tab => {
        let url = new URL(tab.url);
        
        if (tabsCountInfo.some(website => website.url === url.origin)) {
            
            const index = tabsCountInfo.findIndex( website => website.url === url.origin );
            tabsCountInfo[index].count += 1;
            tabsCountInfo[index].ids.push(tab.id);

        } else {
            tabsCountInfo.push({ url: url.origin, count: 1, ids: [ tab.id ] });
        }

        if(url.origin === tabsCountInfo[url]){
            i++;
        }
        tabUrlsArr.push(url.origin);
    });

    tabUrlsArr.sort();

    const set = new Set(tabUrlsArr);

    // browser.tabs.remove(tabsCountInfo[35].ids);

    document.write(tabUrlsArr);
    console.log(tabsCountInfo);
    console.log(tabUrlsArr);
    console.log(set);   
})();
// main();
