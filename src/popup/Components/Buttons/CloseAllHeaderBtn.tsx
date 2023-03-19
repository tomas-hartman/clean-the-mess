import classNames from 'classnames';
import { FC } from 'react';
import { callWithConfirm } from '../../../_modules/callWithConfirm';
import { Icon } from '../Icon';

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
    <button type="button" className={classNames('close-all', 'header-button')} title="Close all listed tabs" onClick={handleClick}>
      <Icon name='RemoveBig' size={16} />
      <span className="hidden">Close all listed tabs</span>
    </button>
  );
};
