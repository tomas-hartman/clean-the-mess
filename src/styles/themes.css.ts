import { createGlobalThemeContract } from '@vanilla-extract/css';

// Changes on light-dark scheme axis
export const themeContract = createGlobalThemeContract({
  palette: {
    fontColor: 'palette-font-color',
    background: 'palette-background',
    headerBackground: 'palette-header-background',
    headerButtonColor: 'palette-header-button-color',
    //   headerButtonBackground: 'palette-header-button-background',
    headerButtonHover: 'palette-header-button-hover',
    //   headerButtonActive: 'palette-header-button-active',
    overviewHeaderButtonHover: "palette-overview-header-button-hover",
    accentHeaderButtonFontColor: 'palette-accent-header-button-font-color',
    accentHeaderButtonBackground: 'palette-accent-header-button-background',
    accentHeaderButtonHover: 'palette-accent-header-button-hover',
    //   accentHeaderButtonActive: 'palette-accent-header-button-active',
    itemHover: 'palette-item-hover',
    //   itemActive: 'palette-item-active',
    itemSecondaryFontColor: 'palette-item-secondary-font-color',
    itemArrowButtonColor: "palette-item-arrow-button-color",
    itemButtonColor: 'palette-item-button-color',
    //   itemButtonBackground: 'palette-item-button-background',
    itemButtonHover: 'palette-item-button-hover',
    itemButtonActive: 'palette-item-button-active',
    searchBackground: 'palette-search-background',
    searchFontColor: 'palette-search-font-color',
    //   searchSecondaryFontColor: 'palette-search-secondary-font-color',
    separatorColor: 'palette-separator-color',
    confirmButtonBackground: 'palette-confirm-button-background',
    confirmButtonHover: 'palette-confirm-button-hover',
    //   confirmButtonActive: 'palette-confirm-button-active'
  }
});

// {
//   headerHeight: 'util-header-height',
//   headerButtonSize: 'util-header-button-size',
//   headerButtonIconSize: 'util-header-button-icon-size',
//   headerButtonBorderRadius: 'util-header-button-border-radius',
//   itemButtonSize: 'util-item-button-size',
//   itemButtonIconSize: 'util-item-button-icon-size',
//   itemButtonBorderRadius: 'util-item-button-border-radius',
//   searchBorderRadius: 'util-search-border-radius'
// }

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
  },
});
