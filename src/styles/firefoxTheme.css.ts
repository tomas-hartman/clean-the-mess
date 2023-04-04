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
  color: {
    font: firefoxPalette.neutral[3],
    fontSecondary: firefoxPalette.neutral[48],
    fontAlternative: firefoxPalette.neutral[3],

    background: firefoxPalette.neutral[100],
    backgroundSecondary: firefoxPalette.neutral[100],
    backgroundAlternative: firefoxPalette.neutral[100],

    separator: firefoxPalette.neutral[86],

    emphasisDark: firefoxPalette.transparent[86086],
    emphasisLight: firefoxPalette.transparent[94082],

    linkHover: firefoxPalette.transparent[86086],
    linkHoverPurple: firefoxPalette.accent[1],

    backButton: firefoxPalette.neutral[100],
    backButtonFont: firefoxPalette.transparent[3080],
    getInButtonFont: firefoxPalette.transparent[3020],

    buttonFont: firefoxPalette.transparent[3080],
    buttonHover: firefoxPalette.transparent[94082],
    buttonActive: firefoxPalette.transparent[86086],

    backgroundHeaderContainer: 'inherit',
    searchContainer: firefoxPalette.neutral[3],
    searchInputColor: firefoxPalette.neutral[3],
    searchBackground: 'inherit', // chrome: var(--color-alternative-background);

    liCount: 'inherit',
    liHover: 'inherit',
  },
});

export const themeFirefoxDarkScheme = createGlobalTheme("html[data-theme='dark']", themeContract, {
  color: {
    font: firefoxPalette.neutral[100],
    fontSecondary: firefoxPalette.neutral[98],
    fontAlternative: firefoxPalette.neutral[3],

    background: firefoxPalette.neutral[32],
    backgroundSecondary: firefoxPalette.neutral[32],
    backgroundAlternative: firefoxPalette.neutral[100],

    separator: firefoxPalette.transparent[48054],

    emphasisDark: firefoxPalette.transparent[48076],
    emphasisLight: firefoxPalette.transparent[48054],

    linkHover: firefoxPalette.accent[2],
    linkHoverPurple: firefoxPalette.accent[1],

    backButton: firefoxPalette.accent[3],
    backButtonFont: firefoxPalette.transparent[98080],
    getInButtonFont: firefoxPalette.transparent[98050],

    buttonFont: firefoxPalette.transparent[98080],
    buttonHover: firefoxPalette.transparent[48054],
    buttonActive: firefoxPalette.transparent[48076],

    backgroundHeaderContainer: 'inherit',
    searchContainer: firefoxPalette.neutral[3],
    searchInputColor: firefoxPalette.neutral[3],
    searchBackground: 'inherit',

    liCount: 'inherit',
    liHover: 'inherit',
  },
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
