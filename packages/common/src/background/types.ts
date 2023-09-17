import { ValueOf } from "../../types"

export const BACKGROUND_EVENT = {
  "BOOKMARK_ALL": "bookmark-all",
  "REFRESH_OPTIONS": "refresh-options",
  "DARK_SCHEME": "darkScheme",
} as const

export type BackgroundEvent = ValueOf<typeof BACKGROUND_EVENT>

// type BackgroundEventProps = {
//   [BackgroundEvent.BOOKMARK_ALL]: {
//     overviewObject: OverviewItem,
//     overviewIndex: number
//   },
// }