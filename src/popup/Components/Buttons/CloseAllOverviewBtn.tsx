import classNames from 'classnames';
import { FC } from 'react';

type CloseAllOverviewBtnProps = {
  onClick: () => void, 
  isHidden: boolean
}

export const CloseAllOverviewBtn: FC<CloseAllOverviewBtnProps> = ({ onClick, isHidden = false }) => (
  <button
    type="button"
    className={classNames('remove', { 'hidden': isHidden })}
    title="Close all tabs with this url"
    onClick={onClick}
  >
    <span className="hidden">Close all tabs with this url</span>
  </button>
);
