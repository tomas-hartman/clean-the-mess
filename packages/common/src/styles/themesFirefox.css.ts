import { createGlobalTheme } from '@vanilla-extract/css';
import { themeContract, themeUtilsContract } from './themes.css';
import { transparentize } from 'polished';

const firefoxPalette = {
  accent: {
    1: '#c169ffb9',
    2: '#663399',
    3: '#9932cc', // darkOrchid
  },
  neutral: {
    100: '#ffffff',
    98: '#f9f9fa',
    86: '#d7d7db',
    48: '#737373',
    32: '#4a4a4f',
    3: '#0c0c0d',
    0: '#000',
  },
  transparent: {
    98_080: transparentize(0.2, '#f9f9fa'),
    98_050: transparentize(0.5, '#f9f9fa'),
    94_082: transparentize(0.18, '#ededf0'),
    86_086: transparentize(0.14, '#d7d7db'),
    48_076: transparentize(0.24, '#737373'),
    48_054: transparentize(0.46, '#737373'),
    3_020: transparentize(0.8, '#0c0c0d'),
    3_080: transparentize(0.2, '#0c0c0d'),
  },
};

export const themeFirefoxLightScheme = createGlobalTheme(':root', themeContract, {
  palette: {
    fontColor: firefoxPalette.neutral[3],
    background: firefoxPalette.neutral[100],
    headerBackground: firefoxPalette.neutral[100],
    headerButtonColor: firefoxPalette.transparent[3080],
    headerButtonHover: firefoxPalette.transparent[94082],
    overviewHeaderButtonHover: firefoxPalette.transparent[94082],
    accentHeaderButtonFontColor: firefoxPalette.transparent[3080],
    accentHeaderButtonBackground: firefoxPalette.neutral[100],
    accentHeaderButtonHover: firefoxPalette.accent[1],
    itemSecondaryFontColor: firefoxPalette.neutral[48],
    itemArrowButtonColor: firefoxPalette.transparent[3020],
    itemHover: firefoxPalette.transparent[86086],
    itemButtonColor: firefoxPalette.transparent[3080],
    itemButtonHover: firefoxPalette.transparent[94082],
    itemButtonActive: firefoxPalette.transparent[86086],
    separatorColor: firefoxPalette.neutral[86],
    searchBackground: firefoxPalette.neutral[3],
    searchFontColor: firefoxPalette.neutral[3],
    confirmButtonBackground: firefoxPalette.transparent[86086],
    confirmButtonHover: firefoxPalette.transparent[94082]
  }
});

export const themeFirefoxDarkScheme = createGlobalTheme("html[data-theme='dark']", themeContract, {
  palette: {
    fontColor: firefoxPalette.neutral[100],
    background: firefoxPalette.neutral[32],
    headerBackground: firefoxPalette.neutral[32],
    headerButtonColor: firefoxPalette.transparent[98080],
    headerButtonHover: firefoxPalette.transparent[48054],
    overviewHeaderButtonHover: firefoxPalette.transparent[48054],
    accentHeaderButtonFontColor: firefoxPalette.transparent[98080],
    accentHeaderButtonBackground: firefoxPalette.accent[3],
    accentHeaderButtonHover: firefoxPalette.accent[2],
    itemSecondaryFontColor: firefoxPalette.neutral[98],
    itemArrowButtonColor: firefoxPalette.transparent[98050],
    itemHover: firefoxPalette.accent[2], // accent 1?
    itemButtonColor: firefoxPalette.transparent[98080],
    itemButtonHover: firefoxPalette.transparent[48054],
    itemButtonActive: firefoxPalette.transparent[48076],
    separatorColor: firefoxPalette.transparent[48054],
    searchBackground: firefoxPalette.neutral[3],
    searchFontColor: firefoxPalette.neutral[3],
    confirmButtonBackground: firefoxPalette.transparent[48076],
    confirmButtonHover: firefoxPalette.transparent[48054]
  }
});

export const themeFirefoxUtils = createGlobalTheme(':root', themeUtilsContract, {
  font: {
    fontSize: 'inherit',
    fontFamily: 'inherit',
  },
  radii: {
    borderRadius: '1px',
  },
  components: {
    searchBorderRadius: '1px',
    searchBorder: 'none',
    searchPaddingLeft: '8px',

    largeButtonSize: '32px',
    smallButtonSize: '20px',
  },
  misc: {
    browser: 'firefox',
  },
});
