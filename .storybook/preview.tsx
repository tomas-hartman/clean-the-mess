import React from 'react';
import type { Preview } from '@storybook/react';

import { useColorScheme } from '../src/popup/hooks';

import '../src/styles/firefox/style.scss';
import '../src/popup/Popup.css';

import { themeFirefoxDarkScheme, themeFirefoxLightScheme, themeFirefoxUtils } from '../src/styles/firefoxTheme.css';
import clsx from 'clsx';

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
      const { darkSchemeOn } = useColorScheme();

      return (
        <div className={clsx(themeFirefoxDarkScheme, themeFirefoxLightScheme, themeFirefoxUtils)}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
