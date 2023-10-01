import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/themes.css";

export const detailHeaderContainer = style({
  paddingTop: 4, // chrome or both
  backgroundColor: themeContract.palette.headerBackground,
})

export const headerContentBase = style({
  display: 'grid',
  alignContent: 'center',
  height: 32,
  paddingLeft: 4,
  paddingRight: 4,
  gap: 4,
  justifyItems: 'stretch'
})

export const detailHeaderContent = style([headerContentBase, {
  gridTemplateColumns: '32px auto 32px',
}])