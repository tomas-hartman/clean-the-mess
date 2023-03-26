import clsx from 'clsx';
import { FC } from 'react';
import { IconName } from '../../../icons/icons';
import { Icon, ICON_SIZES } from '../Icon';
import { button } from './Button.css';

type ButtonProps = {
  icon: IconName;
  title: string;
  onClick: () => void;
  isHidden?: boolean;
  size: 'small' | 'large';
  isBack?: boolean;
};

export const Button: FC<ButtonProps> = ({ onClick: handleClick, icon, title, isHidden, size, isBack }) => {
  const buttonClasses = clsx({ hidden: isHidden }, button({ size, isBack }));

  return (
    <button type="button" className={buttonClasses} title={title} onClick={handleClick}>
      <Icon name={icon} size={ICON_SIZES[size]} />
      <span className="hidden">{title}</span>
    </button>
  );
};
