import { FC } from 'react';
import { callWithConfirm } from '../../../_modules/callWithConfirm';

type CloseAllHeaderBtnProps = {
  onClick: () => void, 
  itemCount: number
}

export const CloseAllHeaderBtn: FC<CloseAllHeaderBtnProps> = ({ onClick, itemCount }) => {
  const handleClick = () => {
    if (itemCount > 15) {
      callWithConfirm('closeTabs', onClick, () => true, itemCount);
      return;
    }

    onClick();
  };

  return (
    <button type="button" className="close-all" title="Close all listed tabs" onClick={handleClick}>
      <span className="hidden">Close all listed tabs</span>
    </button>
  );
};
