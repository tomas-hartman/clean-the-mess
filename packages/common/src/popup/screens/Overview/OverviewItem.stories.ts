import type { Meta, StoryObj } from '@storybook/react';
import overviewData from '../../../../dev/search-dev/overview-data';

import { OverviewItem } from './OverviewItem';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof OverviewItem> = {
  title: 'Screens/Overview',
  component: OverviewItem,
};

export default meta;
type Story = StoryObj<typeof OverviewItem>;

export const Item: Story = {
  args: {
    data: overviewData[0],
    showFavicon: true
  },
};