import { EnumGuard, ValueOf } from '../../types';

export type OptionPreference = {
  showFavicons: boolean;
  showTabsLabel: boolean;
};

export const OPTION_TYPE = {
  SHOW_FAVICONS: 'showFavicons',
  SHOW_TABS_LABEL: 'showTabsLabel',
} as const satisfies EnumGuard<OptionPreference>;

export type OptionType = ValueOf<typeof OPTION_TYPE>;
