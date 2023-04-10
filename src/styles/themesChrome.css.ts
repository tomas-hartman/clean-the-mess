import { createGlobalTheme } from "@vanilla-extract/css";
import { themeContract, themeUtilsContract } from "./themes.css";

// TODO: improve color definitions
const palette = {
  color1: '#c169ffb9',
  color2: '#fff',
  color3: '#d7d7dbdc',
  color4: '#c8c8c9',
  color5: '#d7d7db',
  color6: '#f1f3f4',
  color7: '#0c0c0d',
  color8: '#626365',
  color9: '#0c0c0dcc',
  color10: '#663399',
  color11: '#9932cc',
  color12: '#737373c1',
  color13: '#4b4c4f',
  color14: '#3f4042',
  color15: '#292a2d',
  color16: '#35363a',
  color17: '#202124',
  color18: '#e8eaed',
  color19: '#acafb1',
  color20: '#5f6368',
  color21: '#f9f9fa'
}

const all = {
  colorLinkHoverPurple: palette.color1,
  colorBackButton: palette.color2,
  colorLinkHover: palette.color3,
  colorEmphasisDark: palette.color3,
  colorEmphasisLight: palette.color4,
  colorSeparator: palette.color5,
  colorBackground: palette.color2,
  colorSecondaryBackground: palette.color2,
  colorAlternativeBackground: palette.color6,
  colorFont: palette.color7,
  colorSecondaryFont: palette.color8,
  colorAlternativeFont: palette.color7,
  colorFontButton: palette.color9,
  searchInputColor: palette.color7,
  buttonHoverColor: palette.color4,
  buttonActiveColor: palette.color3,
  headerContainerBg: palette.color2,
  searchContainerColor: 'inherit',
  liCountColor: palette.color8,
  liCountHoverColor: palette.color7,
  backButtonHover: palette.color2,
}

const dark = {
  colorLinkHover: palette.color10,
  colorBackButton: palette.color11,
  colorEmphasisDark: palette.color12,
  colorEmphasisLight: palette.color13,
  colorSeparator: palette.color14,
  colorBackground: palette.color15,
  colorSecondaryBackground: palette.color16,
  colorAlternativeBackground: palette.color17,
  colorFont: palette.color18,
  colorSecondaryFont: palette.color19,
  colorAlternativeFont: palette.color20,
  colorFontButton: palette.color19,
  backButtonHover: palette.color10,
}

export const themeChromeLightScheme = createGlobalTheme(':root', themeContract, {
  color: {
    font: all.colorFont,
    fontSecondary: all.colorSecondaryFont,
    fontAlternative: all.colorAlternativeFont,
    background: all.colorBackground,
    backgroundSecondary: all.colorSecondaryBackground,
    backgroundAlternative: all.colorAlternativeBackground,

    separator: all.colorSeparator,

    emphasisDark: all.colorEmphasisDark,
    emphasisLight: all.colorEmphasisLight,

    linkHover: all.colorLinkHover,
    linkHoverPurple: all.colorLinkHoverPurple,

    backButton: all.colorBackButton,
    backButtonHover: all.colorBackButton,
    backButtonFont: all.colorFontButton,
    getInButtonFont: all.colorFontButton,

    buttonFont: all.colorFontButton,
    buttonHover: all.buttonHoverColor,
    buttonActive: all.buttonActiveColor,

    backgroundHeaderContainer: all.headerContainerBg,
    searchContainer: all.searchContainerColor,
    searchInputColor: all.searchInputColor,
    searchBackground: "inherit",

    liCount: all.liCountColor,
    liHover: all.liCountHoverColor,
  }
})

export const themeChromeDarkScheme = createGlobalTheme("html[data-theme='dark']", themeContract, {
  color: {
    font: dark.colorFont,
    fontSecondary: dark.colorSecondaryFont,
    fontAlternative: dark.colorAlternativeFont,
    background: dark.colorBackground,
    backgroundSecondary: dark.colorSecondaryBackground,
    backgroundAlternative: dark.colorAlternativeBackground,

    separator: dark.colorSeparator,

    emphasisDark: dark.colorEmphasisDark,
    emphasisLight: dark.colorEmphasisLight,

    linkHover: dark.colorLinkHover,
    linkHoverPurple: all.colorLinkHoverPurple,

    backButton: dark.colorBackButton,
    backButtonHover: dark.backButtonHover,
    backButtonFont: dark.colorFont,
    getInButtonFont: dark.colorFontButton,

    buttonFont: dark.colorFontButton,
    buttonHover: dark.colorSecondaryBackground,
    buttonActive: all.buttonActiveColor,

    backgroundHeaderContainer: all.headerContainerBg,
    searchContainer: all.searchContainerColor,
    searchInputColor: all.searchInputColor,
    searchBackground: "inherit",

    liCount: "inherit",
    liHover: "inherit",
  }
})

export const themeChromeUtils = createGlobalTheme(':root', themeUtilsContract, {
  font: {
    fontSize: '13px',
    fontFamily: "'San Francisco', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Roboto', 'sans-serif'",
  },
  radii: {
    borderRadius: '100%',
  },
  components: {
    searchBorderRadius: '50px',
    searchBorder: '2px solid transparent',
    searchPaddingLeft: '12px',

    largeButtonSize: '27px',
    smallButtonSize: '22px',
  },
  misc: {
    browser: 'chrome',
  },
});







