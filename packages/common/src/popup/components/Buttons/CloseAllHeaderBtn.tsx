import { FC, useCallback } from 'react';
import { Button } from './Button';
import { callWithConfirm } from '../../utils';

type CloseAllHeaderBtnProps = {
  onClick: () => void;
  itemCount?: number;
};

export const CloseAllHeaderBtn: FC<CloseAllHeaderBtnProps> = ({ onClick, itemCount }) => {
  const handleClick = useCallback(() => {
    if (itemCount && itemCount > 15) {
      callWithConfirm('closeTabs', onClick, () => true, itemCount);
      return;
    }

    onClick();
  }, [itemCount, onClick]);

  return <Button onClick={handleClick} icon="RemoveBig" size="large" title="Close all listed tabs" />;
};
