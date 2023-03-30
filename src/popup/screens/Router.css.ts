import { style } from "@vanilla-extract/css";

export const screenBase = style({
  top: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
})

export const screen = style([screenBase, {
  position: 'absolute',
  height: '100%',
  transform: 'translate(100%)',
  transition: 'transform 150ms cubic-bezier(.07, .95, 0, 1)',
}])

export const screenBodyContainer = style({
  overflowY: "auto",
})