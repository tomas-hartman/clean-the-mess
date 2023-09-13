import type { Meta, StoryObj } from '@storybook/react';
import { BookmarkCloseBtn } from './BookmarkCloseBtn';

const meta: Meta<typeof BookmarkCloseBtn> = {
  title: 'Components/Button',
  component: BookmarkCloseBtn,
};

export default meta;
type Story = StoryObj<typeof BookmarkCloseBtn>;

export const BookmarkClose: Story = {
  args: {},
};