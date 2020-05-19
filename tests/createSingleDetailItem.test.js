const { createSingleDetailItem } = require("../src/popup/popup");

it('should render correct detail element for latest', () => {
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

it('should render correct detail element for details', () => {
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