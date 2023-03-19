import { useState, useEffect } from 'react';
import browser from 'webextension-polyfill';

type Storage = {
  showFavicons: boolean
}

export const useFavicons = () => {
  const [showFavicon, setShowFavicon] = useState(false);

  const onSuccess = (result: Storage) => {
    if (result.showFavicons) {
      setShowFavicon(result.showFavicons);
    }
  };

  const onError = (err: Error) => {
    console.error(err);
  };

  const getValue = async () => {
    const result = await browser.storage.sync.get('showFavicons').catch(onError);

    onSuccess(result as Storage);
  };

  useEffect(() => { getValue() }, []);

  return showFavicon;
};
