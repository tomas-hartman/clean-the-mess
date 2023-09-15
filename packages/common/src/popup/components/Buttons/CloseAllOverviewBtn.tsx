import { FC } from 'react';
import { Button } from './Button';

type CloseAllOverviewBtnProps = {
  onClick: () => void;
  isHidden: boolean;
};

export const CloseAllOverviewBtn: FC<CloseAllOverviewBtnProps> = ({ onClick, isHidden = false }) => (
  <Button title="Close all tabs with this url" onClick={onClick} icon="Remove" size="small" isHidden={isHidden} />
);
