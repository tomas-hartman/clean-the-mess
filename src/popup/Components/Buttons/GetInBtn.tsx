import { FC } from 'react';
import { Icon, ICON_SIZES } from '../Icon';
import { isChrome } from '../../utils';
import clsx from 'clsx';
import { getIn } from './Button.css';
import { themeContract } from '../../../styles/themes.css';

interface GetInBtnProps {
  isHidden?: boolean;
}

export const GetInBtn: FC<GetInBtnProps> = ({ isHidden = false }) => {
  const buttonClasses = clsx(getIn, {
    hidden: isHidden,
  });

  return (
    <div className={buttonClasses} style={{ color: themeContract.color.getInButtonFont }}>
      {isChrome() ? (
        <Icon name="ArrowFilledCh" size={ICON_SIZES.small} />
      ) : (
        <Icon name="ArrowBold" size={ICON_SIZES.small} />
      )}
      <span className="hidden">Get in</span>
    </div>
  );
};
