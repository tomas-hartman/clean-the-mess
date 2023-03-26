import { createTheme } from "@vanilla-extract/css";
import { themeContract } from "./themes.css";

// TODO: ADD DARK THEME
export const themeFirefox = createTheme(themeContract, {
  color: {
    font: "#0c0c0d",
    fontSecondary: "#737373",
    fontAlternative: "#0c0c0d",

    background: "#ffffff",
    backgroundSecondary: "#ffffff",
    backgroundAlternative: "#ffffff",

    separator: "#d7d7db",

    emphasisDark: "#d7d7dbdc",
    emphasisLight: "#ededf0d0",

    linkHover: "#d7d7dbdc",
    linkHoverPurple: "#c169ffb9",

    backButton: "#ffffff",

    buttonFont: "#0c0c0dcc",
    buttonHover: "#ededf0d0", // emphasis light
    buttonActive: "#d7d7dbdc", // emphasis dark

    backgroundHeaderContainer: "inherit",
    searchContainer: "#0c0c0d", // var(--color-alternative-font)

    liCount: "inherit",
    liHover: "inherit",
  },
  font: {
    fontSize: "inherit",
    fontFamily: "inherit",
  },
  radii: {
    borderRadius: "1px",
  },
  components: {
    searchBorderRadius: "1px",
    searchBorder: "none",
    searchPaddingLeft: "8px",
    searchInputColor: "#0c0c0d",

    largeButtonSize: "32px",
    smallButtonSize: "20px",
  },
  misc: {
    browser: "firefox",
  }
})
