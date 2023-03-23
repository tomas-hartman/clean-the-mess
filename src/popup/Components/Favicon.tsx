import clsx from 'clsx';
import { FC } from 'react';

type FaviconProps = {
  /** Base64 encoded image */
  src: string | undefined;
};

export const Favicon: FC<FaviconProps> = ({ src: favicon }) => {
  if (!favicon) return null;

  return <div className={clsx('favicon')} style={{ backgroundImage: `url(${favicon})` }} />;
};
