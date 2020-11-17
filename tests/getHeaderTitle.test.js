import { getHeaderTitle } from '../src/popup/popup';
import { tabsOverview } from './__sampleData__/tabsOverview';

it('getHeaderTitle should return correct results for details', () => {
	const headerTitle = getHeaderTitle(1, 'details', tabsOverview);

	expect(headerTitle).toBe('stackoverflow.com');
});

it('getHeaderTitle should return correct results for latest', () => {
	const headerTitle = getHeaderTitle(1, 'latest', tabsOverview, 10);

	expect(headerTitle).toBe('10 longest unused tabs');
});

it('getHeaderTitle should return nothing for \'\'', () => {
	const headerTitle = getHeaderTitle(1, '', tabsOverview);

	expect(headerTitle).toBe(null);
});

it('getHeaderTitle should return \'\' for id bigger than tabsOverview.length', () => {
	const headerTitle = getHeaderTitle(156, 'details', tabsOverview);

	expect(headerTitle).toBe('');
});

it('getHeaderTitle should return null with tabsOverview = []', () => {
	const headerTitle = getHeaderTitle(0, 'length', []);

	expect(headerTitle).toBe(null);
});