import type { Meta, StoryObj } from '@storybook/react';
import { CloseAllHeaderBtn } from './CloseAllHeaderBtn';

const meta: Meta<typeof CloseAllHeaderBtn> = {
  title: 'Components/Button/Header',
  component: CloseAllHeaderBtn,
};

export default meta;
type Story = StoryObj<typeof CloseAllHeaderBtn>;

export const CloseAll: Story = {
  args: {},
};