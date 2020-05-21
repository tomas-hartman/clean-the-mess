const { search } = require("../src/search/search");
const { tabs, sampleMinifiedTabs } = require("./__sampleData__/tabs");

describe('Search main functionality', () => {
    it.each([
        ["google", 2],
        ["góógle", 2],
        ["example.com", 1],
        ["respekt.cz", 0]
    ])(
        'should look for "%s" and end up with %d entry/ies found',
        (input, expected) => {
            const output = search.perform(sampleMinifiedTabs, input);
            expect(output.length).toBe(expected);
        }
    );

    it('should return entries in correct (tabs-like) format and have url, title, index, id and pinned props ', () => {
        const input = "example.com"
        const output = search.perform(sampleMinifiedTabs, input);
        const item = output[0];

        expect(output).toMatchSnapshot();
        expect(item.url).toBeDefined();
        expect(item.id).toBeDefined();
        expect(item.index).toBeDefined();
        expect(item.pinned).toBeDefined();
    });
});

describe('cleanUrl()', () => {
    it.each([
        ["https://google.com", ["google", "com"]],
        ["https://www.google.com", ["www", "google", "com"]],
        ["https://google.com/something", ["google", "com", "something"]],
        ["https://google.com/?q=something", ["google", "com", "q", "something"]],
        ["https://google.com:3000", ["google", "com", "3000"]],
        ["localhost", ["localhost"]],
        ["localhost:3000", ["localhost", "3000"]],
        ["www.example.com", ["www", "example", "com"]],
        ["about:debugging", ["about", "debugging"]],
        ["128.0.0.1:3000", ["128", "0", "0", "1", "3000"]],

    ])(
        'cleanUrl("%s") should return %s',
        (input, expected) => {
            const output = search.cleanUrl(input);
            expect(output).toBeInstanceOf(Array);
            expect(output).toStrictEqual(expected);
        }
    );
});

describe('standardize()', () => {
    it.each([
        ["Příliš žluťoučký kůň pěl ďábelské ódy", ["prilis", "zlutoucky", "kun", "pel", "dabelske", "ody"]],
        ["atšķirībā no vulkāniskajiem krāteriem", ["atskiriba", "no", "vulkaniskajiem", "krateriem"]],
        ["?!#b@#&?!a?!r?!", ["b", "a", "r"]],
        ["BARBORA@bulantova123.com", ["barbora", "bulantova123", "com"]],
        [
            "Įlinkdama fechtuotojo pragręžė apvalų arbūzą", 
            ['ilinkdama','fechtuotojo','pragreze','apvalu','arbuza']
        ],
        ["„Fix, Schwyz!“, quäkt Jürgen blöd Paß.", ['fix','schwyz','quakt','jurgen','blod','paß']]
    ])(
        'standardize("%s") should return %s',
        (input, expected) => {
            const output = search.standardize(input);
            expect(output).toStrictEqual(expected);
        }
    );
});