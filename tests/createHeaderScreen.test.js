const { createHeaderScreen } = require("../src/popup/popup");
const tabsOverviewMinified = [{
    "url": "https://www.stackoverflow.com",
    "count": 5,
    "ids": [
      87,
      95,
      94,
      98,
      100
    ]
}];

describe('Create header screens for different "types": ', () => {
    it.each([
        ["latest"],
        ["details"]
    ])(
        'should create correct header for %s',
        (input) => {
            
            const output = createHeaderScreen(0, input, tabsOverviewMinified);

            expect(output).toMatchSnapshot();
        }
    );
});

it('should create correct header for latest without id and tabsOverview', () => {
    const output = createHeaderScreen(null, "latest");

    expect(output).toMatchSnapshot();
});