import type { Meta, StoryObj } from '@storybook/react';
import { detailed } from '../../../../../../tests/__sampleData__/detailedArray';

import { ListItem } from './ListItem';

const meta: Meta<typeof ListItem> = {
  title: 'Components/ListItem',
  component: ListItem,
};

export default meta;

type ListItemComponent = StoryObj<typeof ListItem>;
export const ListItemComponent: ListItemComponent = {
  args: {
    favicon: detailed[0].favIconUrl,
    primaryText: 'Hello',
    secondaryText: 'This is a secondary text',
    initActions: <div>A</div>,
    hoverActions: <div>B</div>,
  },
  name: 'List Item Abstraction',
};
