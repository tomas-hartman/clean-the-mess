import { Meta, StoryObj } from '@storybook/react';
import { Confirm } from './Confirm';

const meta: Meta<typeof Confirm> = {
  title: 'Components/Confirm',
  component: Confirm,
};

export default meta;

type Story = StoryObj<typeof Confirm>;

export const ConfirmStory: Story = {
  args: {
    message: 'Are you sure you want to proceed?',
    onConfirm: () => console.log('Confirmed'),
    onCancel: () => console.log('Cancelled')
  },
  name: 'Confirm'
};