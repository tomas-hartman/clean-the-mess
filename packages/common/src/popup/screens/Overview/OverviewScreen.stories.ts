import type { Meta, StoryObj } from '@storybook/react';
import overviewData from '../../../../dev/search-dev/overview-data';

import { OverviewScreen } from './OverviewScreen';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof OverviewScreen> = {
  title: 'Screens/Overview',
  component: OverviewScreen,
};

export default meta;
type Story = StoryObj<typeof OverviewScreen>;

export const Screen: Story = {
  args: {
    overviewData: overviewData,
    headerData: { openTabs: 15 }
  },
};