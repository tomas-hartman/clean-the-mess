import { FC } from 'react';

type GoBackBtnProps = {
  /** switchToScreen function with desired destination */
  handleClick: () => void;
}

/**
 * Go back button. Used on screen headers.
 */
export const GoBackBtn: FC<GoBackBtnProps> = ({ handleClick }) => {
  return (
    <button
      type="button"
      className="back go-back"
      title="Back"
      onClick={handleClick}
    >
      <span className="hidden">
        Back
      </span>
    </button>
  );
};

