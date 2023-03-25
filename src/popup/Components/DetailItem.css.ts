import { style } from "@vanilla-extract/css";

export const detailItem = style({
  listStyle: "none",
  display: "flex",
  gap: 8,
  padding: "8px 12px",
  alignItems: "center",

  ":hover": {
    backgroundColor: "var(--color-link-hover)",
  }
})

export const detailItemBody = style({
  flexBasis: "100%",
  minWidth: 0,
})

export const detailItemBodyText = style({
  whiteSpace: "nowrap",
  overflow: "hidden",
  width: "100%",
  display: "inline-block",
  textOverflow: "ellipsis"
})

export const detailItemControls = style({
  display: "inline-flex",
  gap: 4,
})