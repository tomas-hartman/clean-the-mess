import { style } from '@vanilla-extract/css';
import { themeContract } from '../../../styles/themes.css';
import { itemContainer } from '../../components/ListItem/ListItem.css';

export const overviewItem = style([
  itemContainer,
  {
    padding: '4px 12px',
  },
]);

export const overviewItemBody = style({
  flexBasis: '100%',
  minWidth: 0,
  display: 'flex',
  alignItems: 'center',
});

export const overviewItemControls = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
});

export const overviewItemCount = style({
  color: themeContract.palette.itemSecondaryFontColor,
});
