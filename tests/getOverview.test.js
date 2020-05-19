const { getOverview } = require("../src/popup/popup");
const { tabs } = require("./__sampleData__/tabs");

it('should return correct overview data', () => {
    const output = getOverview(tabs);

    expect(output).toMatchSnapshot();
});

it('overview should have valid properties', () => {
    const output = getOverview(tabs);

    // overview musí být správně dlouhý
    // expect(output.length).toBe(tabs.length);
    // expect(output[0]) objekt má mít 3 properties: url, count a ids
});

// otestovat názvy divných url

// otestovat zapinovaný taby