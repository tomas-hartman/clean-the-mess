import { globalStyle } from "@vanilla-extract/css"
import { themeContract, themeUtilsContract } from "./themes.css"

globalStyle("html, body", {
  padding: 0,
  margin: 0,
  boxSizing: 'border-box',
  overflow: 'hidden',

  font: 'caption',
  cursor: 'default',
  userSelect: 'none',
})

globalStyle("body", {
  backgroundColor: themeContract.color.background,
})

globalStyle("body, input", {
  fontWeight: 400,
  fontSize: themeUtilsContract.font.fontSize,
  fontFamily: themeUtilsContract.font.fontFamily,
  color: themeContract.color.font,
})

globalStyle("ul", {
  listStyle: 'none',
  marginBlockStart: 'auto',
  marginBlockEnd: 'auto',
  paddingInlineStart: 'initial',
})

globalStyle("input", {
  color: themeContract.color.searchInputColor,
})

globalStyle("input:focus, textarea:focus, select:focus", {
  outline: "none",
})

globalStyle(".hidden", {
  display: "none !important",
})