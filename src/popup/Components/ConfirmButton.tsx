import { FC } from 'react';
import { confirmButton } from './Confirm.css';

interface ConfirmButtonProps {
  text: string;
  onClick?: () => void;
}

export const ConfirmButton: FC<ConfirmButtonProps> = ({ text, onClick }) => {
  return (
    <button className={confirmButton} type="button" onClick={onClick}>
      {text}
    </button>
  );
};
