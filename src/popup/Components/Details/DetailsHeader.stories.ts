import type { Meta, StoryObj } from '@storybook/react';

import { DetailsHeader } from './DetailsHeader';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DetailsHeader> = {
  title: 'Components/Details',
  component: DetailsHeader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

export default meta;
type Story = StoryObj<typeof DetailsHeader>;

export const Header: Story = {
  args: {
    title: "Header name"
  },
};