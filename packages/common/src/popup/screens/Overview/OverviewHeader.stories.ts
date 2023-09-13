import type { Meta, StoryObj } from '@storybook/react';

import { OverviewHeader } from './OverviewHeader';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof OverviewHeader> = {
  title: 'Screens/Overview',
  component: OverviewHeader,
};

export default meta;
type Story = StoryObj<typeof OverviewHeader>;

export const Header: Story = {
  args: {},
};