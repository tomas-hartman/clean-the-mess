import { Tabs } from "webextension-polyfill";

export interface OverviewItem { 
  url: Tabs.Tab["url"],
  count: number,
  ids?: number[],
  key: string,
  favicon: Tabs.Tab["favIconUrl"]
}

export type Overview = OverviewItem[];

export type Screens = {
  'details': { 
    ids: OverviewItem["ids"], 
    url?: string, 
    key: string 
  },
  "latest": undefined,
  "search": undefined,
  "overview": undefined
}

export type ScreenName = keyof Screens;
export type Screen = {name: ScreenName, options?: Screens[ScreenName]}

export type Listeners = {
  "items-bookmarked": {
    closeCb: () => void, 
    overviewData: Overview,
  }
}