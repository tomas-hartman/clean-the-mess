import { FC } from 'react';
import { Icon } from '../Icon';
import { isChrome } from '../../utils';
import clsx from 'clsx';

interface GetInBtnProps {
  isHidden?: boolean;
}

export const GetInBtn: FC<GetInBtnProps> = ({ isHidden = false }) => {
  const buttonClasses = clsx('get-in', {
    hidden: isHidden,
  });

  return (
    <button type="button" className={buttonClasses}>
      {isChrome() ? <Icon name="ArrowFilledCh" size={12} /> : <Icon name="ArrowBold" size={12} />}
      <span className="hidden">Get in</span>
    </button>
  );
};
