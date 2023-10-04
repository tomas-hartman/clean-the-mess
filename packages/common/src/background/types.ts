import { EnumGuard, ValueOf } from '../../types';
import { OverviewItem } from '../popup';

export type BackgroundMessageProps = {
  bookmarkAll: {
    overviewItem: OverviewItem;
    overviewIndex: number;
  };
  refreshOptions: null;
  darkScheme: null;
  logger: unknown;
};

export const BACKGROUND_EVENT = {
  BOOKMARK_ALL: 'bookmarkAll',
  REFRESH_OPTIONS: 'refreshOptions',
  DARK_SCHEME: 'darkScheme',
  LOGGER: 'logger',
} as const satisfies EnumGuard<BackgroundMessageProps>;

export type BackgroundEvent = ValueOf<typeof BACKGROUND_EVENT>;
