import { globalStyle } from "@vanilla-extract/css"
import { themeContract, themeUtilsContract } from "../styles/themes.css"

globalStyle("html, body", {
  padding: 0,
  margin: 0,
  boxSizing: 'border-box',
  overflow: 'hidden',

  // display: 'flex',
  // flexDirection: 'column',
  // padding: '10px',

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

globalStyle("#main-container",
  {
    // boxSizing: "border-box",
    // position: "relative",
    // left: "0px",

    // maxWidth: '370px',
    // minWidth: '350px',
    // width: 'auto',

    // minHeight: "300px",
    // maxHeight: "600px",

    // display: "flex",
    // padding: "10px",
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