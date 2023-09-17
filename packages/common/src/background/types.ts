import { ValueOf } from "../../types"
import { OverviewItem } from "../popup"

export const BACKGROUND_EVENT = {
  "BOOKMARK_ALL": "bookmark-all",
  "REFRESH_OPTIONS": "refresh-options",
  "DARK_SCHEME": "darkScheme",
} as const

export type BackgroundEvent = ValueOf<typeof BACKGROUND_EVENT>

export type BackgroundMessage = {
  [BACKGROUND_EVENT.BOOKMARK_ALL]: {
    overviewItem: OverviewItem,
    overviewIndex: number
  },
  [BACKGROUND_EVENT.REFRESH_OPTIONS]: null,
  [BACKGROUND_EVENT.DARK_SCHEME]: null,
}