import type { Meta, StoryObj } from '@storybook/react';
import { BookmarkAllBtn } from './BookmarkAllBtn';

const meta: Meta<typeof BookmarkAllBtn> = {
  title: 'Components/Button',
  component: BookmarkAllBtn,
};

export default meta;
type Story = StoryObj<typeof BookmarkAllBtn>;

export const BookmarkCloseAll: Story = {
  args: {},
};