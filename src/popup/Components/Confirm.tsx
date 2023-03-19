import { VFC } from 'react';

interface ConfirmProps {
  message: string, 
  onConfirm: () => void, 
  onCancel: () => void
}

export const Confirm: VFC<ConfirmProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm">
      <div className="confirm-box">
        <div className="confirm-message-box">
          {message}
        </div>
        <div className="confirm-buttons-section-wrapper">
          <div className="separator separator-bottom" />
          <div className="confirm-buttons-section">
            <button className="confirm-btn" type="button" onClick={onCancel}>Cancel</button>
            <button className="confirm-btn" type="button" onClick={onConfirm}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}
