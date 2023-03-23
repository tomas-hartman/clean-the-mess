import { style } from "@vanilla-extract/css";

export const detailHeaderContainer = style({
  paddingTop: 4, // chrome or both
  backgroundColor: "var(--color-secondary-background)",
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