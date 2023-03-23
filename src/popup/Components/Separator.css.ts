import { style } from "@vanilla-extract/css";

export const separator = style({
  borderBottom: "1px solid var(--color-separator)",
  marginTop: "4px", // TODO: should be 0 too
  marginBottom: 0,
})
