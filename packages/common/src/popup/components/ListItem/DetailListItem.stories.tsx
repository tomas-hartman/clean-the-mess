import { Meta, StoryObj } from '@storybook/react';
import { DetailListItem } from './DetailedListItem';
import { detailed } from '../../../../../../tests/__sampleData__/detailedArray';

const meta: Meta<typeof DetailListItem> = {
  title: 'Components/ListItem',
  component: DetailListItem,
};

export default meta;

type DetailListItemStory = StoryObj<typeof DetailListItem>;
export const DetailListItemComponent: DetailListItemStory = {
  args: {
    data: detailed[0],
  },
  name: 'Detail List Item',
};
