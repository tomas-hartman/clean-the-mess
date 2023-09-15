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
    color: themeContract.palette.itemButtonColor,
    borderRadius: themeUtilsContract.radii.borderRadius,

    ":hover": {
      backgroundColor: themeContract.palette.itemButtonHover,
    },

    ":active": {
      backgroundColor: themeContract.palette.itemButtonActive
    }
  },

  variants: {
    size: {
      large: {
        width: themeUtilsContract.components.largeButtonSize, // TODO proper vars from VE
        height: themeUtilsContract.components.largeButtonSize,
        color: themeContract.palette.headerButtonColor,

        ":hover": {
          backgroundColor: themeContract.palette.headerButtonHover
        }
      },
      small: {
        width: themeUtilsContract.components.smallButtonSize,
        height: themeUtilsContract.components.smallButtonSize,
      }
    },
    isBack: {
      true: {
        backgroundColor: themeContract.palette.accentHeaderButtonBackground,
        color: themeContract.palette.accentHeaderButtonFontColor,
        transform: "rotate(180deg)",

        ":hover": {
          backgroundColor: themeContract.palette.accentHeaderButtonHover,
        }
      }
    },
    isOverview: {
      true: {
        ":hover": {
          backgroundColor: themeContract.palette.overviewHeaderButtonHover
        }
      }
    }
  },
})

export const getIn = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "inherit",

  width: themeUtilsContract.components.smallButtonSize,
  height: themeUtilsContract.components.smallButtonSize,
})
