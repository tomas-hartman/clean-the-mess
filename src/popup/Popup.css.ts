import { globalStyle } from "@vanilla-extract/css"
import { themeContract, themeUtilsContract } from "../styles/themes.css"

globalStyle("html, body", {
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  padding: '10px',
  margin: 0,
  maxWidth: '370px',
  minWidth: '350px',
  width: 'auto',
  overflow: 'hidden',
  backgroundColor: themeContract.color.background,
  font: 'caption',
  cursor: 'default',
  userSelect: 'none',
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

globalStyle("#main-container",
  {
    position: "relative",
    left: "0px",
    minHeight: "300px",
    maxHeight: "600px",
    display: "flex"
  }
)

globalStyle("input", {
  color: themeContract.color.searchInputColor,
})

globalStyle("input:focus, textarea:focus, select:focus", {
  outline: "none",
})

globalStyle(".hidden", {
  display: "none !important",
})