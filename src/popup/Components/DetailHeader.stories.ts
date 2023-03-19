import type { Meta, StoryObj } from '@storybook/react';

import { DetailHeader } from './DetailHeader';

const meta: Meta<typeof DetailHeader> = {
  title: 'Components',
  component: DetailHeader,
};

export default meta;

type Story = StoryObj<typeof DetailHeader>;

export const DetailHeaderComponent: Story = {
  args: {},
  name: 'Detail Header',
};