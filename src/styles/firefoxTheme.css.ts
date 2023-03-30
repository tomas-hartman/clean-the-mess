import { createGlobalTheme } from "@vanilla-extract/css";
import { themeContract, themeUtilsContract } from "./themes.css";

const firefoxPalette = {
  accent: {
    1: "#c169ffb9",
    2: "#663399",
    3: "#9932cc" // darkOrchid
  },
  neutral: {
    100: "#ffffff",
    98: "#f9f9fa",
    86: "#d7d7db",
    48: "#737373",
    32: "#4a4a4f",
    3: "#0c0c0d",
    0: "#000"
  },
  transparent: {
    98_080: "#f9f9facc",
    94_082: "#ededf0d0",
    86_086: "#d7d7dbdc",
    48_076: "#737373c1",
    48_054: "#7373738a",
    3_080: "#0c0c0dcc",
  },
}


export const themeFirefoxLightScheme = createGlobalTheme(":root", themeContract, {
  color: {
    font: firefoxPalette.neutral[3],
    fontSecondary: firefoxPalette.neutral[48],
    fontAlternative: firefoxPalette.neutral[3],

    background: firefoxPalette.neutral[100],
    backgroundSecondary: firefoxPalette.neutral[100],
    backgroundAlternative: firefoxPalette.neutral[100],

    separator: firefoxPalette.neutral[86],

    emphasisDark: firefoxPalette.transparent[86086],
    emphasisLight: firefoxPalette.transparent[94082],

    linkHover: firefoxPalette.transparent[86086],
    linkHoverPurple: firefoxPalette.accent[1],

    backButton: firefoxPalette.neutral[100],

    buttonFont: firefoxPalette.transparent[3080],
    buttonHover: firefoxPalette.transparent[94082],
    buttonActive: firefoxPalette.transparent[86086],

    backgroundHeaderContainer: "inherit",
    searchContainer: firefoxPalette.neutral[3],
    searchInputColor: firefoxPalette.neutral[3],

    liCount: "inherit",
    liHover: "inherit",
  },
})

export const themeFirefoxDarkScheme = createGlobalTheme("html[data-theme='dark']", themeContract, {
  color: {
    "font": firefoxPalette.neutral[100],
    "fontSecondary": firefoxPalette.neutral[98],
    "fontAlternative": firefoxPalette.neutral[3],

    "background": firefoxPalette.neutral[32],
    "backgroundSecondary": firefoxPalette.neutral[32],
    "backgroundAlternative": firefoxPalette.neutral[100],

    "separator": firefoxPalette.transparent[48054],

    "emphasisDark": firefoxPalette.transparent[48076],
    "emphasisLight": firefoxPalette.transparent[48054],

    "linkHover": firefoxPalette.accent[2],
    linkHoverPurple: firefoxPalette.accent[1],

    "backButton": firefoxPalette.accent[3],

    "buttonFont": firefoxPalette.transparent[94082],
    buttonHover: firefoxPalette.transparent[48054],
    buttonActive: firefoxPalette.transparent[48076],

    backgroundHeaderContainer: "inherit",
    searchContainer: firefoxPalette.neutral[3],
    searchInputColor: firefoxPalette.neutral[3],

    liCount: "inherit",
    liHover: "inherit",
  }
})

export const themeFirefoxUtils = createGlobalTheme(":root", themeUtilsContract, {
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

    largeButtonSize: "32px",
    smallButtonSize: "20px",
  },
  misc: {
    browser: "firefox",
  }
})
