import { Meta, StoryObj } from '@storybook/react';
import { LatestListItem } from './LatestListItem';
import { detailed } from '../../../../../../tests/__sampleData__/detailedArray';

const meta: Meta<typeof LatestListItem> = {
  title: 'Components/ListItem',
  component: LatestListItem,
};

export default meta;

type LatestListItemStory = StoryObj<typeof LatestListItem>;
export const LatestListItemComponent: LatestListItemStory = {
  args: {
    data: detailed[0],
  },
  name: 'Latest List Item',
};
