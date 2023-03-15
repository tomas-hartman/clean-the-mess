import type { Meta, StoryObj } from '@storybook/react';

import GetInBtn from './GetInBtn';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof GetInBtn> = {
  title: 'Components/Get in Button',
  component: GetInBtn,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

export default meta;
type Story = StoryObj<typeof GetInBtn>;

export const LoggedIn: Story = {
  args: {},
};