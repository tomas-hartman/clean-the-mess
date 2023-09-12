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
  isOverview?: boolean;
};

export const Button: FC<ButtonProps> = ({ onClick: handleClick, icon, title, isHidden, size, isBack, isOverview }) => {
  const buttonClasses = clsx({ hidden: isHidden }, button({ size, isBack, isOverview }));

  return (
    <button
      type="button"
      className={buttonClasses}
      title={title}
      onClick={e => {
        e.stopPropagation();
        handleClick();
      }}
    >
      <Icon name={icon} size={ICON_SIZES[size]} />
      <span className="hidden">{title}</span>
    </button>
  );
};
