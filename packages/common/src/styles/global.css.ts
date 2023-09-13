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
  backgroundColor: themeContract.palette.background,

  // TODO: Ideally make dependant on overview height
  // minHeight: 300,
  // maxHeight: 600,

  width: 360,
  height: 450,
})

globalStyle("body, input", {
  fontWeight: 400,
  fontSize: themeUtilsContract.font.fontSize,
  fontFamily: themeUtilsContract.font.fontFamily,
  color: themeContract.palette.fontColor,
})

globalStyle("ul", {
  listStyle: 'none',
  marginBlockStart: 'auto',
  marginBlockEnd: 'auto',
  paddingInlineStart: 'initial',
})

globalStyle("input", {
  color: themeContract.palette.searchFontColor,
})

globalStyle("input:focus, textarea:focus, select:focus", {
  outline: "none",
})

globalStyle(".hidden", {
  display: "none !important",
})