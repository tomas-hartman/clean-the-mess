const { setClass } = require("../src/popup/popup");

global.console = {
    error: jest.fn()
}

it('should return correct values for "details"', () => {
    const output1 = setClass("details", "lastDisplayed");
    const output2 = setClass("details", "url");

    expect(output1).toBe("hidden");
    expect(output2).toBe("");
});
it('should return correct values for "latest"', () => {
    const output1 = setClass("latest", "lastDisplayed");
    const output2 = setClass("latest", "url");

    expect(output1).toBe("");
    expect(output2).toBe("hidden");
});
it('should return correct values for "search"', () => {
    const output1 = setClass("search", "lastDisplayed");
    const output2 = setClass("search", "url");

    expect(output1).toBe("hidden");
    expect(output2).toBe("");
});
it('should throw error for incorrect value', () => {
    const output1 = setClass("");

    expect(output1).toBe("");
    expect(global.console.error).toHaveBeenCalledWith("Error: this screen type is not defined.");
});