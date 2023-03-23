import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';
import { detailHeaderContainer, detailHeaderContent } from './DetailHeader.css';
import { Separator } from './Separator';

export const DetailHeader: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <div className={clsx(detailHeaderContainer)}>
    <div /* id="header" */ className={clsx(detailHeaderContent)}>{children}</div>
    <Separator />
  </div>
);
