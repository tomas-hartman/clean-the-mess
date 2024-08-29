import { style } from '@vanilla-extract/css';
import { themeContract, themeUtilsContract } from '../../../styles/themes.css';

export const itemContainer = style({
  listStyle: 'none',
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  borderRadius: themeUtilsContract.radii.listItemBorderRadius,

  ':hover': {
    backgroundColor: themeContract.palette.itemHover,
  },
});

export const detailItem = style([
  itemContainer,
  {
    padding: themeUtilsContract.components.listItemPadding,
  },
]);

export const detailItemBody = style({
  flexBasis: '100%',
  minWidth: 0,
});

export const detailItemBodyText = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  width: '100%',
  display: 'inline-block',
  textOverflow: 'ellipsis',
});

export const detailItemBodyExtraText = style([
  detailItemBodyText,
  {
    fontStyle: 'italic',
  },
]);

export const detailItemControls = style({
  display: 'inline-flex',
  gap: 4,
  alignItems: 'center',
});
