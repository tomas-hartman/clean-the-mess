import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/themes.css";

export const itemContainer = style({
  listStyle: "none",
  display: "flex",
  gap: 8,
  alignItems: "center",

  ":hover": {
    backgroundColor: themeContract.palette.itemHover,
  }
})

export const detailItem = style([itemContainer, {
  padding: "8px 12px",
}])

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

export const detailItemBodyExtraText = style([detailItemBodyText, {
  fontStyle: "italic"
}])

export const detailItemControls = style({
  display: "inline-flex",
  gap: 4,
})