import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const button = recipe({
  base: {
    border: 0,
    padding: 0,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "inherit",
    color: "var(--color-font-button)",

    ":hover": {
      backgroundColor: "var(--button-hover-color)",
    },

    ":active": {
      backgroundColor: "var(--button-active-color)"
    }
  },

  variants: {
    size: {
      large: {
        width: "var(--large-button-dimension)", // TODO proper vars from VE
        height: "var(--large-button-dimension)",
      },
      small: {
        width: "var(--small-button-dimension)",
        height: "var(--small-button-dimension)",
      }
    },
    isBack: {
      true: {
        backgroundColor: "var(--color-back-button)",
        transform: "rotate(180deg)",
      }
    }
  }
})

export const getIn = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "inherit",

  width: "var(--small-button-dimension)",
  height: "var(--small-button-dimension)",
})

// #{$btn-name}.header-button {
//   width: $header-button-dimension;
//   height: $header-button-dimension;
//   border-radius: $border-radius;

//   border: 0;
//   padding: 0;

// }