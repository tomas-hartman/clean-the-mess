import { globalStyle, style } from "@vanilla-extract/css";
import { themeContract, themeUtilsContract } from "../styles/themes.css";

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
  userSelect: 'none'
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

export const screenBase = style({
  top: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
})

export const screen = style([screenBase, {
  position: 'absolute',
  height: '100%',
  transform: 'translate(100%)',
  transition: 'transform 150ms cubic-bezier(.07, .95, 0, 1)',
}])

export const screenBodyContainer = style({
  overflowY: "auto",
})