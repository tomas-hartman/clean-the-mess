import { AssertEnumMatch, ValueOf } from "../../types"

export const OPTION_TYPE = {
  SHOW_FAVICONS: 'showFavicons',
  SHOW_TABS_LABEL: 'showTabsLabel',
} as const

export type OptionType = ValueOf<typeof OPTION_TYPE>

export type OptionPreference = AssertEnumMatch<typeof OPTION_TYPE, {
  [OPTION_TYPE.SHOW_FAVICONS]: boolean,
  [OPTION_TYPE.SHOW_TABS_LABEL]: boolean,
}>