const { search } = require("../src/popup/popup");
const { tabs } = require("./__sampleData__/tabs");
const sampleMinifiedTabs = [
    {
        "id": 5,
        "index": 0,
        "windowId": 1,
        "pinned": false,
        "status": "complete",
        "lastAccessed": 1589322068715,
        "audible": false,
        "mutedInfo": {
          "muted": false
        },
        "sharingState": {
          "camera": false,
          "microphone": false
        },
        "successorTabId": -1,
        "url": "https://www.google.com/?q=1",
        "title": "Google jedna",
      },
    {
        "id": 7,
        "index": 1,
        "windowId": 1,
        "pinned": false,
        "status": "complete",
        "lastAccessed": 1589831142586,
        "audible": false,
        "mutedInfo": {
          "muted": false
        },
        "sharingState": {
          "camera": false,
          "microphone": false
        },
        "successorTabId": -1,
        "url": "https://www.google.com/?q=2",
        "title": "Google 2",
      },
    {
        "id": 15,
        "index": 2,
        "windowId": 1,
        "pinned": false,
        "status": "complete",
        "lastAccessed": 1589831456789,
        "audible": false,
        "mutedInfo": {
          "muted": false
        },
        "sharingState": {
          "camera": false,
          "microphone": false
        },
        "successorTabId": -1,
        "url": "https://www.example.com/?q=1",
        "title": "Example 1",
      },
]

it('should find what I search for', () => {
    const output = search(sampleMinifiedTabs, "google");
    
    expect(output.length).toBe(2);
});
it('should find what I search for: standardized string', () => {
    const output = search(sampleMinifiedTabs, "góógle");
    
    expect(output.length).toBe(2);
});
it('should find what I search for: empty tabs', () => {
    const output = search([], "góógle");

    console.log(output.length);
    console.log(output);
    
    expect(output.length).toBe(2);
});

it('should be able to access function within function', () => {
    console.log(search().standardize("křížaly"));
});