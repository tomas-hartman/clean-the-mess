import { useState, useEffect, useCallback } from 'react';
import browser from 'webextension-polyfill';

type Storage = {
  showFavicons: boolean;
};

export const useFavicons = () => {
  const [showFavicon, setShowFavicon] = useState(false);

  const onSuccess = useCallback((result: Storage) => {
    if (result.showFavicons) {
      setShowFavicon(result.showFavicons);
    }
  }, []);

  const onError = useCallback((err: Error) => {
    console.error(err);
  }, []);

  const getValue = useCallback(async () => {
    const result = await browser.storage.sync.get('showFavicons').catch(onError);

    onSuccess(result as Storage);
  }, [onError, onSuccess]);

  useEffect(() => {
    getValue();
  }, [getValue]);

  return showFavicon;
};
