import { createGlobalThemeContract } from "@vanilla-extract/css";

// Changes on light-dark scheme axis
export const themeContract = createGlobalThemeContract({
  color: {
    font: 'color-font',
    fontSecondary: 'color-font-secondary',
    fontAlternative: 'color-font-alternative',
    background: 'color-background',
    backgroundSecondary: 'color-background-secondary',
    backgroundAlternative: 'color-background-alternative',

    separator: 'color-separator',

    emphasisDark: 'color-emphasis-dark',
    emphasisLight: 'color-emphasis-light',

    linkHover: 'color-link-hover',
    linkHoverPurple: 'color-link-hover-purple',

    backButton: 'color-back-button',

    buttonFont: 'color-button-font',
    buttonHover: 'color-button-hover',
    buttonActive: 'color-button-active',

    backgroundHeaderContainer: 'color-background-header-container',
    searchContainer: 'color-search-container',
    searchInputColor: 'color-search-input-color',

    liCount: 'color-li-count',
    liHover: 'color-li-hover',
  }
});

// Changes only on browser axis
export const themeUtilsContract = createGlobalThemeContract({
  font: {
    fontSize: 'font-size',
    fontFamily: 'font-family',
  },
  radii: {
    borderRadius: 'border-radius',
  },
  components: {
    searchBorderRadius: 'search-border-radius',
    searchBorder: 'search-border',
    searchPaddingLeft: 'search-padding-left',

    largeButtonSize: 'large-button-size',
    smallButtonSize: 'small-button-size',
  },
  misc: {
    browser: 'browser',
  }
})

// export const themeContract = createGlobalThemeContract({
//   color: {
//     font: null,
//     fontSecondary: null,
//     fontAlternative: null,

//     background: null,
//     backgroundSecondary: null,
//     backgroundAlternative: null,

//     separator: null,

//     emphasisDark: null,
//     emphasisLight: null,

//     linkHover: null,
//     linkHoverPurple: null,

//     backButton: null,

//     buttonFont: null,
//     buttonHover: null,
//     buttonActive: null,

//     backgroundHeaderContainer: null,
//     searchContainer: null,

//     liCount: null,
//     liHover: null,
//   },
//   font: {
//     fontSize: null,
//     fontFamily: null,
//   },
//   radii: {
//     borderRadius: null,
//   },
//   components: {
//     searchBorderRadius: null,
//     searchBorder: null,
//     searchPaddingLeft: null,
//     searchInputColor: null,

//     largeButtonSize: null,
//     smallButtonSize: null,
//   },
//   misc: {
//     browser: null,
//   }
// });

