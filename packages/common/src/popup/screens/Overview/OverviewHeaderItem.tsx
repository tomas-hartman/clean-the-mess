import clsx from 'clsx';
import { FC } from 'react';
import { GetInBtn } from '../../components/Buttons';
import { itemWrapper, title, titleWrapper } from './OverviewHeaderItem.css';
import { IconName } from '../../../icons/icons';
import { Icon } from '../../components/Icon';

type OverviewHeaderItemProps = {
  onClick: () => void;
  label: string;
  icon?: IconName;
};

export const OverviewHeaderItem: FC<OverviewHeaderItemProps> = ({ onClick, label, icon }) => (
  <div className={clsx(itemWrapper)} onClick={onClick} onKeyPress={onClick} role="link" tabIndex={0}>
    <div className={clsx(titleWrapper)}>
      {icon && <Icon name={icon} size={14} />}
      <span className={clsx(title)}>{label}</span>
    </div>
    <GetInBtn />
  </div>
);
