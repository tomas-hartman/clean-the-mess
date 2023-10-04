import { createGlobalTheme } from '@vanilla-extract/css';
import { themeContract, themeUtilsContract } from './themes.css';
import { transparentize } from 'polished';

const safariPalette = {
  accent: {
    1: '#c169ffb9',
    2: transparentize(0.2, '#663399'),
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

export const themeSafariLightScheme = createGlobalTheme(':root', themeContract, {
  palette: {
    fontColor: safariPalette.neutral[3],
    background: 'transparent',
    headerBackground: 'transparent',
    headerButtonColor: safariPalette.transparent[3080],
    headerButtonHover: safariPalette.transparent[94082],
    overviewHeaderButtonHover: safariPalette.transparent[94082],
    accentHeaderButtonFontColor: safariPalette.transparent[3080],
    accentHeaderButtonBackground: safariPalette.neutral[100],
    accentHeaderButtonHover: safariPalette.accent[1],
    itemSecondaryFontColor: safariPalette.neutral[48],
    itemArrowButtonColor: safariPalette.transparent[3020],
    itemHover: safariPalette.transparent[86086],
    itemButtonColor: safariPalette.transparent[3080],
    itemButtonHover: safariPalette.transparent[94082],
    itemButtonActive: safariPalette.transparent[86086],
    separatorColor: safariPalette.neutral[86],
    searchBackground: transparentize(0.4, safariPalette.neutral[3]),
    searchFontColor: safariPalette.neutral[3],
    confirmButtonBackground: safariPalette.transparent[86086],
    confirmButtonHover: safariPalette.transparent[94082],
  },
});

export const themeSafariDarkScheme = createGlobalTheme("html[data-theme='dark']", themeContract, {
  palette: {
    fontColor: safariPalette.neutral[100],
    background: 'transparent',
    headerBackground: 'transparent',
    headerButtonColor: safariPalette.transparent[98080],
    headerButtonHover: safariPalette.transparent[48054],
    overviewHeaderButtonHover: safariPalette.transparent[48054],
    accentHeaderButtonFontColor: safariPalette.transparent[98080],
    accentHeaderButtonBackground: safariPalette.accent[3],
    accentHeaderButtonHover: safariPalette.accent[2],
    itemSecondaryFontColor: safariPalette.neutral[98],
    itemArrowButtonColor: safariPalette.transparent[98050],
    itemHover: safariPalette.accent[2], // accent 1?
    itemButtonColor: safariPalette.transparent[98080],
    itemButtonHover: safariPalette.transparent[48054],
    itemButtonActive: safariPalette.transparent[48076],
    separatorColor: safariPalette.transparent[48054],
    searchBackground: transparentize(0.4, safariPalette.neutral[3]),
    searchFontColor: safariPalette.neutral[3],
    confirmButtonBackground: safariPalette.transparent[48076],
    confirmButtonHover: safariPalette.transparent[48054],
  },
});

export const themeSafariUtils = createGlobalTheme(':root', themeUtilsContract, {
  font: {
    fontSize: 'inherit',
    fontFamily: 'inherit',
  },
  radii: {
    borderRadius: '6px',
    listItemBorderRadius: '6px',
  },
  components: {
    searchBorderRadius: '6px',
    searchBorder: 'none',
    searchPaddingLeft: '8px',

    largeButtonSize: '32px',
    smallButtonSize: '20px',

    listItemPadding: '8px 12px',
    listContainerInlinePadding: '6px',
    listContainerBlockPadding: '6px',
  },
  misc: {
    browser: 'safari',
  },
});
