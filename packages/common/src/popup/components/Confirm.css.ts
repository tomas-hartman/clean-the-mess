import { style } from "@vanilla-extract/css";
import { themeContract } from "../../styles/themes.css";

export const confirmOverlay = style({
  backgroundColor: 'rgba(0,0,0, 0.6)',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const confirmBox = style({
  backgroundColor: themeContract.palette.background,
  width: "75%",
  minHeight: "30%",
  borderRadius: "0.2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
})

export const confirmMessage = style({
  // padding: '0.8rem',
  padding: '2rem',
  lineHeight: '1.4rem'
})

export const confirmButtonSection = style({
  padding: '0.8rem',
  backgroundColor: themeContract.palette.headerBackground,
  borderRadius: '0.2rem',
  display: 'flex',
  justifyContent: 'space-evenly'
})

export const confirmButton = style({
  padding: '0.4rem 0.8rem',
  backgroundColor: themeContract.palette.confirmButtonBackground,
  border: '1px',
  color: themeContract.palette.fontColor,
  borderRadius: '0.2rem',
  fontSize: 'inherit',

  ":hover": {
    backgroundColor: themeContract.palette.confirmButtonHover,
  },
})