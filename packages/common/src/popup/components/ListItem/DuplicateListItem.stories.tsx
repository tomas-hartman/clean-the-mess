import { Meta, StoryObj } from '@storybook/react';
import { DuplicateListItem } from './DuplicateListItem';
import { detailed } from '../../../../../../tests/__sampleData__/detailedArray';

const meta: Meta<typeof DuplicateListItem> = {
  title: 'Components/ListItem',
  component: DuplicateListItem,
};

export default meta;

type DuplicateListItemStory = StoryObj<typeof DuplicateListItem>;
export const DuplicateListItemComponent: DuplicateListItemStory = {
  args: {
    data: {
      url: detailed[1].url,
      title: detailed[1].title,
      favicon: detailed[1].favIconUrl,
      tabs: [detailed[1], detailed[2], detailed[3]],
    },
  },
  name: 'Duplicate List Item',
};
