import { Tabs } from 'webextension-polyfill';

export type OverviewItem = {
  url: Tabs.Tab['url'];
  count: number;
  ids?: number[];
  key: number;
  favicon?: Tabs.Tab['favIconUrl'];
};

export type Overview = OverviewItem[];

export type Screens = {
  'details': {
    ids: OverviewItem['ids'];
    url?: string;
    key: number;
  };
  'latest': undefined;
  'search': undefined;
  'overview': undefined;
};

export type ScreenName = keyof Screens;
export type Screen = { name: ScreenName; options?: Screens[ScreenName]; };
