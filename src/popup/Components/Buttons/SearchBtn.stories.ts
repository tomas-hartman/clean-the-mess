import type { Meta, StoryObj } from '@storybook/react';

import { SearchBtn } from './SearchBtn';

const meta: Meta<typeof SearchBtn> = {
  title: 'Components/Button/Header',
  component: SearchBtn,
};

export default meta;
type Story = StoryObj<typeof SearchBtn>;

export const Search: Story = {
  args: {},
};