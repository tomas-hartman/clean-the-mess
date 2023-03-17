import { FC } from 'react';
import { SwitchToScreenType } from '../../Popup';

interface SearchBtnProps {
  switchToScreen: SwitchToScreenType;
}

export const SearchBtn: FC<SearchBtnProps> = ({ switchToScreen }) => {
  return (
    <button type="button" id="search-btn" title="Search" onClick={() => switchToScreen('search')}>
      <span className="hidden">Search</span>
    </button>
  );
};