import { FC } from 'react';
import classNames from 'classnames';

interface GetInBtnProps {
  isHidden?: boolean;
}

export const GetInBtn: FC<GetInBtnProps> = ({ isHidden = false }) => {
  const buttonClasses = classNames('get-in', {
    'hidden': isHidden
  });

  return (
    <button type="button" className={buttonClasses}>
      <span className="hidden">Get in</span>
    </button>
  );
};