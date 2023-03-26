import React from 'react';
import type { Preview } from '@storybook/react';

import '../src/styles/firefox/style.scss';
import '../src/popup/Popup.css';
import { themeFirefox } from '../src/styles/firefox.theme.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    Story => (
      <div className={themeFirefox}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
