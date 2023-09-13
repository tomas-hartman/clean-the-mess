import clsx from 'clsx';
import { VFC } from 'react';
import { separator } from './Separator.css';

export const Separator: VFC = () => {
  return <div className={clsx('separator', 'separator-bottom', separator)} />;
};
