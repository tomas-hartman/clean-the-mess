import type { Meta, StoryObj } from '@storybook/react';
import { detailed } from "../../../../../tests/__sampleData__/detailedArray"

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
    data: detailed[1],
    type: "url"
  },
  name: 'Detail Item',
};