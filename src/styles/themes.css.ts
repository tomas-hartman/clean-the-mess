import { createGlobalThemeContract } from "@vanilla-extract/css";

// Changes on light-dark scheme axis
export const themeColorContract = createGlobalThemeContract({
  color: {
    colorFont: 'color-font',
    colorFontSecondary: 'color-font-secondary',
    colorFontAlternative: 'color-font-alternative',
    colorBackground: 'color-background',
    colorBackgroundSecondary: 'color-background-secondary',
    colorBackgroundAlternative: 'color-background-alternative',

    colorSeparator: 'color-separator',

    colorEmphasisDark: 'color-emphasis-dark',
    colorEmphasisLight: 'color-emphasis-light',

    colorLinkHover: 'color-link-hover',
    colorLinkHoverPurple: 'color-link-hover-purple',

    colorBackButton: 'color-back-button',

    colorButtonFont: 'color-button-font',
    colorButtonHover: 'color-button-hover',
    colorButtonActive: 'color-button-active',

    colorBackgroundHeaderContainer: 'color-background-header-container',
    colorSearchContainer: 'color-search-container',
    colorSearchInputColor: 'color-search-input-color',

    colorLiCount: 'color-li-count',
    colorLiHover: 'color-li-hover',
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

