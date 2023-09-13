import { style } from '@vanilla-extract/css';
import { themeContract } from '../../../styles/themes.css';

export const overviewHeaderLatestItems = style({
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

export const overviewHeaderLatestItemsTitle = style({
  display: 'inline-block',
  lineHeight: '20px',
});
