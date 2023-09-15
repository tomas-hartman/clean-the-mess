import type { Meta, StoryObj } from '@storybook/react';
import { CloseBtn } from './CloseBtn';

const meta: Meta<typeof CloseBtn> = {
  title: 'Components/Button',
  component: CloseBtn,
};

export default meta;
type Story = StoryObj<typeof CloseBtn>;

export const CloseDetail: Story = {
  args: {},
};