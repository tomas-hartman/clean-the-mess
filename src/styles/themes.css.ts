import { createThemeContract } from "@vanilla-extract/css";

export const themeContract = createThemeContract({
  color: {
    font: null,
    fontSecondary: null,
    fontAlternative: null,

    background: null,
    backgroundSecondary: null,
    backgroundAlternative: null,

    separator: null,

    emphasisDark: null,
    emphasisLight: null,

    linkHover: null,
    linkHoverPurple: null,

    backButton: null,

    buttonFont: null,
    buttonHover: null,
    buttonActive: null,

    backgroundHeaderContainer: null,
    searchContainer: null,

    liCount: null,
    liHover: null,
  },
  font: {
    fontSize: null,
    fontFamily: null,
  },
  radii: {
    borderRadius: null,
  },
  components: {
    searchBorderRadius: null,
    searchBorder: null,
    searchPaddingLeft: null,
    searchInputColor: null,

    largeButtonSize: null,
    smallButtonSize: null,
  },
  misc: {
    browser: null,
  }
});

