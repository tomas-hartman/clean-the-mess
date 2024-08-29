import { style } from '@vanilla-extract/css';
import { themeUtilsContract } from '../../../styles/themes.css';

export const searchError = style({
  height: 'auto',
  padding: themeUtilsContract.components.listItemPadding,
  boxSizing: 'border-box',

  ':hover': {
    backgroundColor: 'transparent',
  },
});
