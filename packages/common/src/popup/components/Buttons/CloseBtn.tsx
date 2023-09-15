import { FC } from 'react';
import { Button } from './Button';

interface CloseBtnProps {
  isHidden?: boolean;
  onClick: () => void;
}

export const CloseBtn: FC<CloseBtnProps> = ({ isHidden = false, onClick }) => (
  <Button title="Close tab" onClick={onClick} icon="Remove" size="small" isHidden={isHidden} />
);
