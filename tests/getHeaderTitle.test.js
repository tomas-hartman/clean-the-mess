const { getHeaderTitle } = require("../src/popup/popup");
const { tabsOverview } = require("./mocks/tabsOverview");

// jest.global = {latestShownCount: 15};
// tabsOverview = [{"url": "https://www.google.com"}];

it("getHeaderTitle should return correct resilts for details", () => {
    const headerTitle = getHeaderTitle(1, "details", tabsOverview);

    expect(headerTitle).toBe("stackoverflow.com");
});

it("getHeaderTitle should return correct resilts for latest", () => {
    const headerTitle = getHeaderTitle(1, "latest", tabsOverview);

    expect(headerTitle).toBe("10 longest unused tabs");
});

it("getHeaderTitle should return nothing for ''", () => {
    const headerTitle = getHeaderTitle(1, "", tabsOverview);

    expect(headerTitle).toBe("");
});

it("getHeaderTitle should return '' for id bigger than tabsOverview.length", () => {
    const headerTitle = getHeaderTitle(156, "details", tabsOverview);

    expect(headerTitle).toBe("");
});

it("getHeaderTitle should fail with tabsOverview = []", () => {
    const headerTitle = getHeaderTitle(0, "length", []);

    expect(headerTitle).toBe("10 longest unused tabs");
});