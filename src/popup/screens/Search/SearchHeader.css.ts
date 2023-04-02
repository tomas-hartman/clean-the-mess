import { style } from "@vanilla-extract/css";
import { themeContract, themeUtilsContract } from "../../../styles/themes.css";

export const searchContainer = style({
  display: "flex",
  backgroundColor: "white", // TODO
  color: themeContract.color.searchContainer,
  alignItems: "center",
  paddingLeft: 8,
  paddingRight: 8,
  gap: 4,
})

export const searchInput = style({
  height: themeUtilsContract.components.largeButtonSize,

  boxShadow: "none",

  borderRadius: themeUtilsContract.components.searchBorderRadius,
  border: themeUtilsContract.components.searchBorder,

  flex: 1,
})

export const searchControls = style({
  color: themeContract.color.searchInputColor,
})