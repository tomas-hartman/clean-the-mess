import React from 'react';
import type { Preview } from '@storybook/react';

import { useColorScheme } from '../src/popup/hooks';

import '../src/styles/global.css';
import '../src/styles/themesFirefox.css';

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
    Story => {
      useColorScheme();

      return <Story />;
    },
  ],
};

export default preview;
