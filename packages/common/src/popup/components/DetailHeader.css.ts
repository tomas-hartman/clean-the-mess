import { style } from '@vanilla-extract/css';
import { themeContract, themeUtilsContract } from '../../styles/themes.css';

export const detailHeaderContainer = style({
  paddingTop: themeUtilsContract.components.listContainerBlockPadding, // chrome or both
  backgroundColor: themeContract.palette.headerBackground,
  paddingInline: themeUtilsContract.components.listContainerInlinePadding,
});

export const headerContentBase = style({
  display: 'grid',
  alignContent: 'center',
  height: 32,
  gap: themeUtilsContract.components.listContainerInlinePadding,
  justifyItems: 'stretch',
});

export const detailHeaderContent = style([
  headerContentBase,
  {
    gridTemplateColumns: '32px auto 32px',
  },
]);
