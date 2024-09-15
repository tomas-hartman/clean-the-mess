import { useCallback, useEffect, useState } from 'react';

export const useColorScheme = () => {
  const [darkSchemeOn, setDarkSchemeOn] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
  );

  const listener = useCallback((e: MediaQueryListEvent) => {
    setDarkSchemeOn(e.matches);
  }, []);

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener);
    document.getElementsByTagName('html')[0].dataset.theme = darkSchemeOn ? 'dark' : 'light';
  }, [listener, darkSchemeOn]);

  return {
    darkSchemeOn,
  };
};
