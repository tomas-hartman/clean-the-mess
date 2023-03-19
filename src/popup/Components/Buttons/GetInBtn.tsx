import { FC } from 'react';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { isChrome } from '../../utils';

interface GetInBtnProps {
  isHidden?: boolean;
}

export const GetInBtn: FC<GetInBtnProps> = ({ isHidden = false }) => {
  const buttonClasses = classNames('get-in', {
    'hidden': isHidden
  });

  return (
    <button type="button" className={buttonClasses}>
      {isChrome() ? <Icon name='ArrowFilledCh' size={12} /> : <Icon name='ArrowBold' size={12} />}
      <span className="hidden">Get in</span>
    </button>
  );
};