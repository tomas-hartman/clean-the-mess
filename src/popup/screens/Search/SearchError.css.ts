import { style } from '@vanilla-extract/css';

export const searchError = style({
  height: 'auto',
  padding: '8px 12px',
  boxSizing: 'border-box',

  ':hover': {
    backgroundColor: 'transparent',
  },
});
