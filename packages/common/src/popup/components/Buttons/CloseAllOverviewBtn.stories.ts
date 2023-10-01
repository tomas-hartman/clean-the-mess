import type { Meta, StoryObj } from '@storybook/react';
import { CloseAllOverviewBtn } from './CloseAllOverviewBtn';

const meta: Meta<typeof CloseAllOverviewBtn> = {
  title: 'Components/Button',
  component: CloseAllOverviewBtn,
};

export default meta;
type Story = StoryObj<typeof CloseAllOverviewBtn>;

export const CloseAllOverview: Story = {
  args: {},
};