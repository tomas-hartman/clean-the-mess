import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';
import { screen as screenStyle, screenSlideOut, screenSlideIn } from './Router.css';
import { useNavigate } from '../providers';
import { ScreenName } from '../types';

type ScreenProps = {
  screenName: Exclude<ScreenName, 'overview'>;
};

export const Screen: FC<PropsWithChildren<ScreenProps>> = ({ screenName, children }) => {
  const { screen } = useNavigate();
  return (
    <div className={clsx(screenStyle, screenSlideOut, screen.name === screenName && screenSlideIn)}>{children}</div>
  );
};
