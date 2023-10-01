import type { Meta, StoryObj } from '@storybook/react';

import Popup from './Popup';

const meta: Meta<typeof Popup> = {
  title: 'Popup',
  component: Popup,
  decorators: [Story => <Story />],
};

export default meta;

type Story = StoryObj<typeof Popup>;

export const PopupComponent: Story = {
  args: {},
  name: 'Popup',
};
