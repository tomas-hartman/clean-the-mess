const { getLatestUsed } = require("../src/popup/popup");
const { tabs } = require("./__sampleData__/tabs");

it('should return formated array', () => {
    const output = getLatestUsed(tabs, 5);

    expect(output).toMatchSnapshot();
    expect(output.length).toBe(5);
});

it('should return formated array of 10', () => {
    const output = getLatestUsed(tabs);

    expect(output.length).toBe(10);
});

it('should not fail if getLatestCount is bigger than tabs.length', () => {
    const getLatestCount = tabs.length + 10;
    const output = getLatestUsed(tabs, getLatestCount);

    expect(output).toMatchSnapshot();
    expect(output.length).toBe(tabs.length);
});