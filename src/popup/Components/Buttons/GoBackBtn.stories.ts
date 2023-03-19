import { Meta, StoryObj } from '@storybook/react';
import { GoBackBtn } from './GoBackBtn';

const meta: Meta<typeof GoBackBtn> = {
  title: 'Components/Button/Header',
  component: GoBackBtn,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

export default meta;

export const GoBack: StoryObj<typeof GoBackBtn> = {
  args: {},
};
