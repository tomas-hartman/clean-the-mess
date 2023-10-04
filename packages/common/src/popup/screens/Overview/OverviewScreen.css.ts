import { style } from '@vanilla-extract/css';
import { themeUtilsContract } from '../../../styles/themes.css';

export const screenList = style({
  marginTop: 4,
  overflowY: 'auto',
  paddingInline: themeUtilsContract.components.listContainerInlinePadding,
});
