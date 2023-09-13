import { style } from "@vanilla-extract/css";

export const headerTitleBase = style({
  alignSelf: 'center',
  width: '100%',
})

export const latestHeaderTitle = style([headerTitleBase, {
  justifySelf: 'center',
  textAlign: "center"
}])