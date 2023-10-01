import type { Meta, StoryObj } from '@storybook/react';
import { GetInBtn } from './GetInBtn';

const meta: Meta<typeof GetInBtn> = {
  title: 'Components/Button',
  component: GetInBtn,
};

export default meta;
type Story = StoryObj<typeof GetInBtn>;

export const GetIn: Story = {
  args: {},
};