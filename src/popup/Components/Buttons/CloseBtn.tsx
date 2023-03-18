import { FC } from 'react';
import classNames from 'classnames';
import { Icon } from '../Icon';

interface CloseBtnProps {
  tId: number | undefined;
  isHidden?: boolean;
  isDetail?: boolean;
  closeTabs: (id: number) => void;
}

export const CloseBtn: FC<CloseBtnProps> = ({ tId, isHidden = false, isDetail = false, closeTabs }) => {
  const buttonClasses = classNames('remove', {
    'hidden': isHidden,
    'isDetail': isDetail,
  });

  const handleClick = () => {
    tId && closeTabs(tId)
  };

  return (
    <button type="button" className={buttonClasses} title="Close tab" onClick={handleClick}>
      <Icon name="Remove" size={12} /> 
      <span className="hidden">Close tab</span>
    </button>
  );
};