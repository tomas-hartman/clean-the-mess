const { getDetailsArray } = require("../src/popup/popup");

const { tabs } = require("./__sampleData__/tabs");
const { tabsOverview } = require("./__sampleData__/tabsOverview");

it('should return array with details only for certain url', () => {
    const overviewId = 0;
    const output = getDetailsArray(0, tabsOverview, tabs);

    expect(output).toMatchSnapshot();
    expect(output.length).toBe(tabsOverview[overviewId].ids.length);
});

// vymyslet failcase scénáře