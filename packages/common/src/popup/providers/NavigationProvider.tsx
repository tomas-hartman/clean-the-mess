import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from 'react';
import { ScreenName, ScreensProps, ScreenProps } from '../types';

export type Navigate = <T extends ScreenName>(next: T, options?: ScreensProps[T]) => void;

type RouterContextProps = {
  screen: ScreenProps;
  navigate: Navigate;
};

export const NavigationContext = createContext<RouterContextProps>({
  screen: { name: 'overview' },
} as RouterContextProps);

export const NavigationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [screen, setScreen] = useState<ScreenProps>({ name: 'overview' });

  const navigate = useCallback<Navigate>((nextScreen, options) => {
    setScreen({ name: nextScreen, options });
  }, []);

  const value = {
    screen,
    navigate,
  };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const useNavigate = () => {
  return useContext(NavigationContext);
};
