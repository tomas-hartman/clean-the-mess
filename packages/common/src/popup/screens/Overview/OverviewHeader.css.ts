import { style } from '@vanilla-extract/css';
import { headerContentBase } from '../../components/DetailHeader.css';
import { headerTitleBase } from '../Latest/LatestHeader.css';
import { themeUtilsContract } from '../../../styles/themes.css';

export const overviewHeaderContainer = style({
  marginTop: themeUtilsContract.components.listContainerBlockPadding,
  paddingInline: themeUtilsContract.components.listContainerInlinePadding,
});

export const overviewHeaderContent = style([
  headerContentBase,
  {
    gridTemplateColumns: 'auto 32px',
  },
]);

export const overviewHeaderTitle = style([
  headerTitleBase,
  {
    justifySelf: 'initial',
  },
]);

export const overviewHeaderMessage = style({
  padding: '4px 8px',
  height: '20px',
  display: 'inline-block',
  lineHeight: '20px',
});
