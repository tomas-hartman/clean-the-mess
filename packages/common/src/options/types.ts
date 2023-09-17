import { ValueOf } from "../../types"

export const OPTION_TYPE = {
  SHOW_FAVICONS: 'showFavicons',
  SHOW_TABS_LABEL: 'showTabsLabel',
} as const

export type OptionType = ValueOf<typeof OPTION_TYPE>

export type OptionPreference = {
  [OPTION_TYPE.SHOW_FAVICONS]: boolean,
  [OPTION_TYPE.SHOW_TABS_LABEL]: boolean,
}