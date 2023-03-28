import { style } from "@vanilla-extract/css";
import { headerContentBase } from "../../components/DetailHeader.css";
import { headerTitleBase } from "../Latest/LatestHeader.css";

export const overviewHeaderContainer = style({})

export const overviewHeaderContent = style([headerContentBase, {
  gridTemplateColumns: "auto 40px"
}])

export const overviewHeaderTitle = style([headerTitleBase, {
  justifySelf: "initial",
}])

export const overviewHeaderMessage = style({
  padding: '4px 8px',
  height: '20px',
  display: 'inline-block',
  lineHeight: '20px',
})