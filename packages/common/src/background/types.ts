import { AssertEnumMatch, ValueOf } from "../../types"
import { OverviewItem } from "../popup"

export const BACKGROUND_EVENT = {
  "BOOKMARK_ALL": "bookmarks-all",
  "REFRESH_OPTIONS": "refresh-options",
  "DARK_SCHEME": "dark-scheme",
} as const

export type BackgroundEvent = ValueOf<typeof BACKGROUND_EVENT>

export type BackgroundMessage = AssertEnumMatch<typeof BACKGROUND_EVENT, {
  [BACKGROUND_EVENT.BOOKMARK_ALL]: {
    overviewItem: OverviewItem,
    overviewIndex: number
  },
  [BACKGROUND_EVENT.REFRESH_OPTIONS]: null,
  [BACKGROUND_EVENT.DARK_SCHEME]: null,
}>

