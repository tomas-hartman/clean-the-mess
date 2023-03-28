import { createGlobalTheme } from "@vanilla-extract/css";
import { themeColorContract, themeUtilsContract } from "./themes.css";

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


export const themeFirefoxLightScheme = createGlobalTheme(":root", themeColorContract, {
  color: {
    colorFont: firefoxPalette.neutral[3],
    colorFontSecondary: firefoxPalette.neutral[48],
    colorFontAlternative: firefoxPalette.neutral[3],

    colorBackground: firefoxPalette.neutral[100],
    colorBackgroundSecondary: firefoxPalette.neutral[100],
    colorBackgroundAlternative: firefoxPalette.neutral[100],

    colorSeparator: firefoxPalette.neutral[86],

    colorEmphasisDark: firefoxPalette.transparent[86086],
    colorEmphasisLight: firefoxPalette.transparent[94082],

    colorLinkHover: firefoxPalette.transparent[86086],
    colorLinkHoverPurple: firefoxPalette.accent[1],

    colorBackButton: firefoxPalette.neutral[100],

    colorButtonFont: firefoxPalette.transparent[3080],
    colorButtonHover: firefoxPalette.transparent[94082],
    colorButtonActive: firefoxPalette.transparent[86086],

    colorBackgroundHeaderContainer: "inherit",
    colorSearchContainer: firefoxPalette.neutral[3],
    colorSearchInputColor: firefoxPalette.neutral[3],

    colorLiCount: "inherit",
    colorLiHover: "inherit",
  },
})

export const themeFirefoxDarkScheme = createGlobalTheme(":root", themeColorContract, {
  color: {
    "colorFont": firefoxPalette.neutral[100],
    "colorFontSecondary": firefoxPalette.neutral[98],
    "colorFontAlternative": firefoxPalette.neutral[3],

    "colorBackground": firefoxPalette.neutral[32],
    "colorBackgroundSecondary": firefoxPalette.neutral[32],
    "colorBackgroundAlternative": firefoxPalette.neutral[100],

    "colorSeparator": firefoxPalette.transparent[48054],

    "colorEmphasisDark": firefoxPalette.transparent[48076],
    "colorEmphasisLight": firefoxPalette.transparent[48054],

    "colorLinkHover": firefoxPalette.accent[2],
    colorLinkHoverPurple: firefoxPalette.accent[1],

    "colorBackButton": firefoxPalette.accent[3],

    "colorButtonFont": firefoxPalette.transparent[94082],
    colorButtonHover: firefoxPalette.transparent[48054],
    colorButtonActive: firefoxPalette.transparent[48076],

    colorBackgroundHeaderContainer: "inherit",
    colorSearchContainer: firefoxPalette.neutral[3],
    colorSearchInputColor: firefoxPalette.neutral[3],

    colorLiCount: "inherit",
    colorLiHover: "inherit",
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
