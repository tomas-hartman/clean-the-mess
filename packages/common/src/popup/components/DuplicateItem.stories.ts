import type { Meta, StoryObj } from '@storybook/react';
import { detailed } from '../../../../../tests/__sampleData__/detailedArray';

import { DuplicateItem } from './DuplicateItem';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DuplicateItem> = {
  title: 'Components',
  component: DuplicateItem,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

export default meta;
type Story = StoryObj<typeof DuplicateItem>;

export const DuplicateItemComponent: Story = {
  args: {
    data: {
      url: detailed[1].url,
      title: detailed[1].title,
      favicon: detailed[1].favIconUrl,
      tabs: [detailed[1], detailed[2], detailed[3]],
    },
  },
  name: 'Duplicate Item',
};
