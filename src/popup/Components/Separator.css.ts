import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/themes.css";

export const separator = style({
  borderBottom: `1px solid ${themeContract.palette.separatorColor}`,
  marginTop: "4px", // TODO: should be 0 too
  marginBottom: 0,
})
