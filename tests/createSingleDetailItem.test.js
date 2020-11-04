const { createSingleDetailItem } = require("../src/popup/popup");

it('should render correct detail element for latest (source _tabsOverview_)', () => {
    const data = {
        date: "18. 5. 2020 21:45:35",
        title: "Youtube",
        id: 65,
        url: "https://www.youtube.com/"
    }
    const props = {
        data,
        itemId: 1,
        type: "latest"
    }
    const output = createSingleDetailItem(props);

    expect(output).toMatchSnapshot();
});

it('should render correct detail element for details (source _tabs_)', () => {
    const data = {
        "id": 23,
        "index": 2,
        "windowId": 1,
        "highlighted": false,
        "active": false,
        "attention": false,
        "pinned": false,
        "status": "complete",
        "hidden": false,
        "discarded": false,
        "incognito": false,
        "width": 862,
        "height": 857,
        "lastAccessed": 1589732493951,
        "audible": false,
        "mutedInfo": {
          "muted": false
        },
        "isInReaderMode": false,
        "sharingState": {
          "camera": false,
          "microphone": false
        },
        "successorTabId": -1,
        "url": "https://www.respekt.cz/tydenik/2009/19/vezeni-gaza",
        "title": "Vězení Gaza • RESPEKT",
        "favIconUrl": "data:image/x-icon;base64"
      }

    const props = {
        data,
        itemId: 1,
        type: "details"
    }
    const output = createSingleDetailItem(props);

    expect(output).toMatchSnapshot();
});

it('should render items with dangerous characters (<div>) in title, safely', () => {
  const data = {
    "id": 22,
    "index": 3,
    "windowId": 1,
    "pinned": false,
    "lastAccessed": 1589822256789,
    "url": "https://www.example.com/?q=1#<div>",
    "title": "<div> Example 1",
  }

  const props = {
    data,
    itemId: 1,
    type: "details"
}

  const output = createSingleDetailItem(props);

  // There should not appear unexpected <div> generated from title
  expect(output.querySelector(".item-text-container").children.length).toBe(3);
  expect(output.querySelector(".title").children.length).toBe(0);
  expect(output.querySelector(".url").children.length).toBe(0);
});