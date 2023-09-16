import clsx from 'clsx';
import { FC } from 'react';
import { separator } from './Separator.css';

export const Separator: FC = () => {
  return <div className={clsx('separator', 'separator-bottom', separator)} />;
};
