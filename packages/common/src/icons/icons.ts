import ArrowBig from './btn-big-arrow.svg';
import RemoveBig from './btn-big-remove.svg';
import ArrowBold from './btn-bold-arrow.svg';
import ArrowFilledCh from './btn-arrow-filled-ch.svg';
import BookmarkStar from './btn-bookmark-star.svg';
import BookmarkStarFull from './btn-bookmark-star-full.svg';
import BookmarkClose from './ico-bookmark-close.svg';
import Remove from './btn-remove.svg';
import Search24 from './btn-search-24.svg';

import { phosphor } from './phosphor';

export const Icons = {
  ArrowBig,
  RemoveBig,
  ArrowBold,
  ArrowFilledCh,
  BookmarkStar,
  BookmarkStarFull,
  BookmarkClose,
  Remove,
  Search24,
  ...phosphor,
};

export type IconName = keyof typeof Icons;
