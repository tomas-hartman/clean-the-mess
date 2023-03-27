import { createGlobalTheme } from "@vanilla-extract/css";
import { themeColorContract, themeUtilsContract } from "./themes.css";

export const themeFirefoxLightScheme = createGlobalTheme(":root", themeColorContract, {
  color: {
    colorFont: "#0c0c0d",
    colorFontSecondary: "#737373",
    colorFontAlternative: "#0c0c0d",

    colorBackground: "#ffffff",
    colorBackgroundSecondary: "#ffffff",
    colorBackgroundAlternative: "#ffffff",

    colorSeparator: "#d7d7db",

    colorEmphasisDark: "#d7d7dbdc",
    colorEmphasisLight: "#ededf0d0",

    colorLinkHover: "#d7d7dbdc",
    colorLinkHoverPurple: "#c169ffb9",

    colorBackButton: "#ffffff",

    colorButtonFont: "#0c0c0dcc",
    colorButtonHover: "#ededf0d0", // emphasis light
    colorButtonActive: "#d7d7dbdc", // emphasis dark

    colorBackgroundHeaderContainer: "inherit",
    colorSearchContainer: "#0c0c0d", // var(--color-alternative-font)
    colorSearchInputColor: "#0c0c0d",

    colorLiCount: "inherit",
    colorLiHover: "inherit",
  },
})

export const themeFirefoxDarkScheme = createGlobalTheme(":root", themeColorContract, {
  color: {
    "colorFont": "#ffffff",
    "colorFontSecondary": "#f9f9fa",
    "colorFontAlternative": "#0c0c0d",

    "colorBackground": "#4a4a4f",
    "colorBackgroundSecondary": "var(--color-background)",
    "colorBackgroundAlternative": "rgb(255, 255, 255)",

    "colorSeparator": "#7373738a",

    "colorEmphasisDark": "#737373c1",
    "colorEmphasisLight": "#7373738a",

    "colorLinkHover": "#663399",
    colorLinkHoverPurple: "#c169ffb9",

    "colorBackButton": "darkorchid",

    "colorButtonFont": "#f9f9facc",
    colorButtonHover: "var(--color-emphasis-light)",
    colorButtonActive: "var(--color-emphasis-dark)",

    colorBackgroundHeaderContainer: "inherit",
    colorSearchContainer: "var(--color-alternative-font)",
    colorSearchInputColor: "var(--color-alternative-font)",

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
