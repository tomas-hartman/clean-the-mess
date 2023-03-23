import clsx from 'clsx';
import { CSSProperties, FC } from 'react';
import { SwitchToScreenType } from '../../providers/RouterProvider';
import { Icon } from '../Icon';

interface SearchBtnProps {
  switchToScreen: SwitchToScreenType;
  style?: CSSProperties;
}

export const SearchBtn: FC<SearchBtnProps> = ({ switchToScreen, style }) => (
  <button
    type="button"
    id="search-btn"
    style={style}
    className={clsx('search-btn', 'header-button')}
    title="Search"
    onClick={() => switchToScreen('search')}
  >
    <Icon name="Search24" size={16} />
    <span className="hidden">Search</span>
  </button>
);
