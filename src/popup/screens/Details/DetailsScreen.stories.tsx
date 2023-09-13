import type { Meta, StoryObj } from '@storybook/react';

import { DetailsScreen } from './DetailsScreen';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DetailsScreen> = {
  title: 'Screens/Details',
  component: DetailsScreen,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

export default meta;
type Story = StoryObj<typeof DetailsScreen>;

export const Screen: Story = {
  args: {
    screen: {
      name: 'details',
      options: {
        ids: [77, 80, 92, 97, 99],
        url: 'https://www.google.com',
        key: 2,
      },
    },
  },
};
