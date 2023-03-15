import type { Meta, StoryObj } from '@storybook/react';

import { SearchBtn } from './SearchBtn';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SearchBtn> = {
  title: 'Components/Button',
  component: SearchBtn,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

export default meta;
type Story = StoryObj<typeof SearchBtn>;

export const Search: Story = {
  args: {},
};