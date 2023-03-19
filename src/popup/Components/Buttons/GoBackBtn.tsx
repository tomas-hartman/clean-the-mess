import classNames from 'classnames';
import { FC } from 'react';
import { Icon } from '../Icon';

export type GoBackBtnProps = {
  /** switchToScreen function with desired destination */
  handleClick: () => void;
}

/**
 * Go back button. Used on screen headers.
 */
export const GoBackBtn: FC<GoBackBtnProps> = ({ handleClick }) => {
  return (
    <>
      <button
        type="button"
        className={classNames('back', 'go-back', 'header-button')}
        title="Back"
        onClick={handleClick}
      >
        <Icon name='ArrowBig' size={18} />
        <span className="hidden">
        Back
        </span>
      </button>
    </>
  );
};

