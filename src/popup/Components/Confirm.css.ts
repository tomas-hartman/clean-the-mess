import { style } from "@vanilla-extract/css";

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
  backgroundColor: "var(--color-background)",
  width: "75%",
  minHeight: "30%",
  borderRadius: "0.2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
})

export const confirmMessage = style({
  // padding: '0.8rem',
  padding: '2rem',
  lineHeight: '1.4rem'
})

export const confirmButtonSection = style({
  padding: '0.8rem',
  backgroundColor: 'var(--color-secondary-background)',
  borderRadius: '0.2rem',
  display: 'flex',
  justifyContent: 'space-evenly'
})

export const confirmButton = style({
  padding: '0.4rem 0.8rem',
  backgroundColor: 'var(--color-emphasis-dark)',
  border: '1px',
  color: 'var(--color-font)',
  borderRadius: '0.2rem',
  fontSize: 'inherit',

  ":hover": {
    backgroundColor: 'var(--color-emphasis-light)',
  },
})