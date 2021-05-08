import { createSingleOverviewItem } from '../src/popup/popup';

it('should return correct component', () => {
  const data = {
    url: 'https://jestjs.io',
    count: 3,
    ids: [
      81,
      93,
      96,
    ],
  };

  const props = {
    itemId: 1,
    data,
  };

  const output = createSingleOverviewItem(props);

  expect(output).toMatchSnapshot();
});
