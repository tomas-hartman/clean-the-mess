import clsx from 'clsx';
import { FC } from 'react';
import { IconName, Icons } from '../../icons/icons';

type IconSize = 14 | 18;

export const ICON_SIZES = {
  large: 18,
  small: 14,
} as const;

type IconProps = {
  name: IconName;
  size: IconSize;
};

export const Icon: FC<IconProps> = ({ name, size }) => {
  const Component = Icons[name];

  return <Component className={clsx('icon', `icon-${size}`)} style={{ height: size, width: size, display: 'flex' }} />;
};
