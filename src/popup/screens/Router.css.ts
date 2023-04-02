import { style } from "@vanilla-extract/css";

const TRANSITION = "transform 150ms cubic-bezier(.07, .95, 0, 1)"

export const screenBodyContainer = style({
  width: 360,
  minHeight: 300,
  maxHeight: 600,

  boxSizing: "border-box",

  position: "relative"
})

export const screen = style({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  display: "flex",
  flexDirection: "column",
})

export const overviewScreen = style([screen, {
  position: "relative",
}])

export const screenSlideOut = style({
  transform: "translateX(100%)",

  transition: TRANSITION,
})

export const screenSlideIn = style({
  transform: "translateX(0)",

  transition: TRANSITION,
})

export const overviewSlideOut = style({
  transform: "translateX(-100%)",

  transition: TRANSITION,
})

export const overviewSlideIn = style({
  transform: "translateX(0)",

  transition: TRANSITION,
})
