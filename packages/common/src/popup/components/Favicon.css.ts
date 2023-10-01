import { style } from "@vanilla-extract/css";

const DEFAULT_SIZE = 16

export const favicon = style({
  backgroundSize: DEFAULT_SIZE,
  backgroundRepeat: "no-repeat",
  height: DEFAULT_SIZE,
  width: DEFAULT_SIZE,
  flexShrink: 0,
})