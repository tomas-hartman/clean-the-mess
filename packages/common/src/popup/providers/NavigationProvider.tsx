import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from 'react';
import { ScreenName, Screens, Screen } from '../types';

export type SwitchToScreenType = <T extends ScreenName>(next: T, options?: Screens[T]) => void;

type RouterContextProps = {
  screen: Screen;
  switchToScreen: SwitchToScreenType;
};

export const NavigationContext = createContext<RouterContextProps>({
  screen: { name: 'overview' },
} as RouterContextProps);

export const NavigationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [screen, setScreen] = useState<Screen>({ name: 'overview' });

  const switchToScreen = useCallback((nextScreen, options) => {
    setScreen({ name: nextScreen, options: options });
  }, []);

  const value = {
    screen,
    switchToScreen,
  };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const useNavigate = () => {
  return useContext(NavigationContext);
};
