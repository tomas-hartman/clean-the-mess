import { createContext, FC, useCallback, useState } from 'react';
import { ScreenName, Screens, Screen } from '../../types';

export type SwitchToScreenType = <T extends ScreenName>(next: T, options?: Screens[T]) => void;

type RouterContextProps = {
  screen: Screen;
  switchToScreen: SwitchToScreenType;
};

export const RouterContext = createContext<RouterContextProps>({ screen: { name: 'overview' } } as RouterContextProps);

export const RouterProvider: FC = ({ children }) => {
  const [screen, setScreen] = useState<Screen>({ name: 'overview' });

  const switchToScreen = useCallback((nextScreen, options) => {
    setScreen({ name: nextScreen, options: options });
  }, []);

  const value = {
    screen,
    switchToScreen,
  };

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};
