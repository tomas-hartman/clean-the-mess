import { Meta, StoryObj } from '@storybook/react';
import { PinnedListItem } from './PinnedListItem';
import { detailed } from '../../../../../../tests/__sampleData__/detailedArray';

const meta: Meta<typeof PinnedListItem> = {
  title: 'Components/ListItem',
  component: PinnedListItem,
};

export default meta;

type PinnedListItemStory = StoryObj<typeof PinnedListItem>;
export const PinnedListItemComponent: PinnedListItemStory = {
  args: {
    data: detailed[0],
  },
  name: 'Pinned List Item',
};
