import { Tabs } from 'webextension-polyfill';
import { EnumGuard, ValueOf } from '../../types';

export type OverviewItem = {
  url: Tabs.Tab['url'];
  count: number;
  ids?: number[];
  key: number;
  favicon?: Tabs.Tab['favIconUrl'];
};

export type Overview = OverviewItem[];

export type ScreensProps = {
  details: {
    ids: OverviewItem['ids'];
    url?: string;
    key: number;
  };
  latest: undefined;
  search: undefined;
  overview: undefined;
};

export const SCREEN = {
  OVERVIEW: 'overview',
  DETAILS: 'details',
  LATEST: 'latest',
  SEARCH: 'search',
} as const satisfies EnumGuard<ScreensProps>;

export type ScreenName = ValueOf<typeof SCREEN>;

export type ScreenProps = {
  name: ScreenName;
  options?: ScreensProps[ScreenName];
};
