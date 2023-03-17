import { FC } from 'react';
import classNames from 'classnames';

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
      <span className="hidden">Close tab</span>
    </button>
  );
};