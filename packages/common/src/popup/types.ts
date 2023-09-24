import { Tabs } from 'webextension-polyfill';
import { EnumGuard, ValueOf } from '../../types';

export type OverviewItem = {
  url: Tabs.Tab['url'];
  count: number;
  ids: number[];
  key: string;
  favicon?: Tabs.Tab['favIconUrl'];
};

export type ScreensProps = {
  details: {
    ids: OverviewItem['ids'];
    url?: string;
    key: string;
    hasActionButton?: boolean;
  };
  latest: undefined;
  search: undefined;
  overview: undefined;
  duplicates: undefined;
};

export const SCREEN = {
  OVERVIEW: 'overview',
  DETAILS: 'details',
  LATEST: 'latest',
  SEARCH: 'search',
  DUPLICATES: 'duplicates',
} as const satisfies EnumGuard<ScreensProps>;

export type ScreenName = ValueOf<typeof SCREEN>;

export type ScreenProps = {
  name: ScreenName;
  options?: ScreensProps[ScreenName];
};
