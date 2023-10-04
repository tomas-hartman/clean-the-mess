import { createGlobalTheme } from '@vanilla-extract/css';
import { themeContract, themeUtilsContract } from './themes.css';
import { darken, transparentize } from 'polished';

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
  color21: '#f9f9fa',
};

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
  backButtonHover: palette.color1,
  headerBackgroundHover: palette.color3,
  itemButtonHover: palette.color4,
};

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
  headerBackgroundHover: palette.color15,
  itemButtonHover: transparentize(0.3, darken(0.1, palette.color10)),
  overviewHeaderButtonHover: palette.color14,
};

export const themeChromeLightScheme = createGlobalTheme(':root', themeContract, {
  palette: {
    fontColor: all.colorFont,
    background: all.colorBackground,
    headerBackground: all.colorSecondaryBackground,
    headerButtonColor: all.colorFontButton,
    headerButtonHover: all.headerBackgroundHover,
    overviewHeaderButtonHover: all.headerBackgroundHover,
    accentHeaderButtonFontColor: all.colorFontButton,
    accentHeaderButtonBackground: all.colorBackButton,
    accentHeaderButtonHover: all.backButtonHover,
    itemSecondaryFontColor: all.colorSecondaryFont,
    itemArrowButtonColor: all.colorFontButton,
    itemHover: all.colorLinkHover,
    itemButtonColor: all.colorFontButton,
    itemButtonHover: all.buttonHoverColor,
    itemButtonActive: all.buttonActiveColor,
    separatorColor: all.colorSeparator,
    searchBackground: all.searchContainerColor,
    searchFontColor: all.searchInputColor,
    confirmButtonBackground: all.colorEmphasisDark,
    confirmButtonHover: all.colorEmphasisLight,
  },
});

export const themeChromeDarkScheme = createGlobalTheme("html[data-theme='dark']", themeContract, {
  palette: {
    fontColor: dark.colorFont,
    background: dark.colorBackground,
    headerBackground: dark.colorSecondaryBackground,
    headerButtonColor: dark.colorFontButton,
    headerButtonHover: dark.headerBackgroundHover,
    overviewHeaderButtonHover: dark.overviewHeaderButtonHover,
    accentHeaderButtonFontColor: dark.colorFont,
    accentHeaderButtonBackground: dark.colorBackButton,
    accentHeaderButtonHover: dark.backButtonHover,
    itemSecondaryFontColor: dark.colorSecondaryFont,
    itemArrowButtonColor: dark.colorFontButton,
    itemHover: dark.colorLinkHover, // or colorLinkHoverPurple?
    itemButtonColor: dark.colorFontButton,
    itemButtonHover: dark.itemButtonHover,
    itemButtonActive: all.buttonActiveColor,
    separatorColor: dark.colorSeparator,
    searchBackground: all.searchContainerColor, // chrome: var(--color-alternative-background); - dark!
    searchFontColor: all.searchInputColor,
    confirmButtonBackground: dark.colorEmphasisDark,
    confirmButtonHover: dark.colorEmphasisLight,
  },
});

export const themeChromeUtils = createGlobalTheme(':root', themeUtilsContract, {
  font: {
    fontSize: '13px',
    fontFamily: "'San Francisco', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Roboto', 'sans-serif'",
  },
  radii: {
    borderRadius: '100%',
    listItemBorderRadius: '0',
  },
  components: {
    searchBorderRadius: '50px',
    searchBorder: '2px solid transparent',
    searchPaddingLeft: '12px',

    largeButtonSize: '27px',
    smallButtonSize: '22px',

    listItemPadding: '8px 12px',
    listContainerInlinePadding: '0',
    listContainerBlockPadding: '4px',
  },
  misc: {
    browser: 'chrome',
  },
});
