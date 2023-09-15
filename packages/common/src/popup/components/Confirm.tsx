import { VFC } from 'react';
import { confirmBox, confirmButtonSection, confirmMessage, confirmOverlay } from './Confirm.css';
import { ConfirmButton } from './ConfirmButton';
import { Separator } from './Separator';

interface ConfirmProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Confirm: VFC<ConfirmProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={confirmOverlay}>
      <div className={confirmBox}>
        <div className={confirmMessage}>{message}</div>
        <div className="confirm-buttons-section-wrapper">
          <Separator />
          <div className={confirmButtonSection}>
            <ConfirmButton text="Cancel" onClick={onCancel} />
            <ConfirmButton text="OK" onClick={onConfirm} />
          </div>
        </div>
      </div>
    </div>
  );
};
