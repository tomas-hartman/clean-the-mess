import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeContract, themeUtilsContract } from "../../../styles/themes.css";

export const button = recipe({
  base: {
    border: 0,
    padding: 0,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "inherit",
    color: themeContract.color.buttonFont,
    borderRadius: themeUtilsContract.radii.borderRadius,

    ":hover": {
      backgroundColor: themeContract.color.buttonHover,
    },

    ":active": {
      backgroundColor: themeContract.color.buttonActive
    }
  },

  variants: {
    size: {
      large: {
        width: themeUtilsContract.components.largeButtonSize, // TODO proper vars from VE
        height: themeUtilsContract.components.largeButtonSize,
      },
      small: {
        width: themeUtilsContract.components.smallButtonSize,
        height: themeUtilsContract.components.smallButtonSize,
      }
    },
    isBack: {
      true: {
        backgroundColor: themeContract.color.backButton,
        color: themeContract.color.backButtonFont,
        transform: "rotate(180deg)",

        ":hover": {
          backgroundColor: themeContract.color.backButtonHover,
        }
      }
    }
  }
})

export const getIn = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "inherit",

  width: themeUtilsContract.components.smallButtonSize,
  height: themeUtilsContract.components.smallButtonSize,
})
