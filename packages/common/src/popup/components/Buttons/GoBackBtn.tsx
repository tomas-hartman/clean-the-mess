import { FC } from 'react';
import { Button } from './Button';

export type GoBackBtnProps = {
  /** switchToScreen function with desired destination */
  onClick: () => void;
};

/**
 * Go back button. Used on screen headers.
 */
export const GoBackBtn: FC<GoBackBtnProps> = ({ onClick }) => (
  <Button onClick={onClick} icon="ArrowBig" size="large" title="Back" isBack />
);
