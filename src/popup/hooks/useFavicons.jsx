const { useState, useEffect } = require('react');

export const useFavicons = () => {
  const [showFavicon, setShowFavicon] = useState(false);

  const onSuccess = (result) => {
    if (result.showFavicons) {
      setShowFavicon(result.showFavicons);
    }
  };

  const onError = (err) => {
    console.error(err);
  };

  const getValue = async () => {
    const result = await browser.storage.sync.get('showFavicons').catch(onError);

    onSuccess(result);
  };

  useEffect(() => getValue(), []);

  return showFavicon;
};
