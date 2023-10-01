import { style } from '@vanilla-extract/css';
import { themeContract } from '../../../styles/themes.css';

export const itemWrapper = style({
  marginTop: '4px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '4px 12px',
  boxSizing: 'border-box',

  ':hover': {
    backgroundColor: themeContract.palette.itemHover,
  },
});

export const titleWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
});

export const title = style({
  display: 'inline-block',
  lineHeight: '20px',
});
