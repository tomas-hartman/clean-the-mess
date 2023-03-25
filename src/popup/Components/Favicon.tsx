import clsx from 'clsx';
import { FC } from 'react';
import { favicon } from './Favicon.css';

type FaviconProps = {
  /** Base64 encoded image */
  src: string | undefined;
};

export const Favicon: FC<FaviconProps> = ({ src: faviconBase64 }) => {
  if (!faviconBase64) return null;

  return <div className={clsx(favicon)} style={{ backgroundImage: `url(${faviconBase64})` }} />;
};
