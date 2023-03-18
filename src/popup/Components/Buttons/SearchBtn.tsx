import classNames from 'classnames';
import { FC } from 'react';
import { SwitchToScreenType } from '../../Popup';

interface SearchBtnProps {
  switchToScreen: SwitchToScreenType;
}

export const SearchBtn: FC<SearchBtnProps> = ({ switchToScreen }) => (
  <button type="button" id="search-btn" className={classNames('search-btn', 'header-button')} title="Search" onClick={() => switchToScreen('search')}>
    <span className="hidden">Search</span>
  </button>
);