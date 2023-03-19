import type { Meta, StoryObj } from '@storybook/react';
import { tabs } from '../../../tests/__sampleData__/tabs';

import { DetailsItem } from './DetailItem';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DetailsItem> = {
  title: 'Components',
  component: DetailsItem,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

export default meta;
type Story = StoryObj<typeof DetailsItem>;


export const ItemComponent: Story = {
  args: {
    data: tabs[0],
  },
  name: 'Detail Item',
};