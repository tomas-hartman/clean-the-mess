import browser from 'webextension-polyfill';
import { getNormalizedUrl } from './overview';
import { getHash } from './helpers';
import { ValueOf } from '../../types';

const Storage = {
  MOST_POPULAR: 'most_popular',
} as const;

type Storage = ValueOf<typeof Storage>;

type StorageObject = {
  [Storage.MOST_POPULAR]: Popular[];
};

const getStorageData = async (key: Storage) => (await browser.storage.local.get(key)) as StorageObject[typeof key];

const setStorageData = async (key: Storage, data: StorageObject[Storage]) =>
  await browser.storage.local.set({
    [key]: data,
  });

interface Popular {
  id: string;
  normalizedUrl: string;
  firstOpenAt: string;
  lastOpenAt: string;
  openCount: number;
}

const getAllPopular = async () => {
  return getStorageData(Storage.MOST_POPULAR);
};

const getPopularNormalized = async (normalizedUrl: string) => {
  const data = await getStorageData(Storage.MOST_POPULAR);

  return data.find(item => item.normalizedUrl === normalizedUrl);
};

const updatePopularNormalized = async (normalizedUrl: string, onUpdate: (val: Popular) => Partial<Popular>) => {
  // TODO: needs what string format?
  const date = new Date().toISOString();

  // modify the data
  const popular = await getStorageData(Storage.MOST_POPULAR);

  const updatedItemId = popular.findIndex(item => item.normalizedUrl === normalizedUrl);

  if (updatedItemId === -1) {
    popular.push({
      id: getHash(normalizedUrl),
      normalizedUrl,
      openCount: 1,
      firstOpenAt: date,
      lastOpenAt: date,
    });
  } else {
    const result = onUpdate(popular[updatedItemId]);

    popular.splice(updatedItemId, 1, {
      ...popular[updatedItemId],
      ...result,
    });
  }

  return await setStorageData(Storage.MOST_POPULAR, popular);
};

const getPopular = async (url: string) => {
  const normalizedUrl = getNormalizedUrl(url);

  return await getPopularNormalized(normalizedUrl);
};

const updatePopular = async (url: string, onUpdate: (val: Popular) => Partial<Popular>) => {
  const normalizedUrl = getNormalizedUrl(url);

  return await updatePopularNormalized(normalizedUrl, onUpdate);
};

const logPopular = async ({ url }: { url: string }) => {
  const date = new Date().toISOString();

  return await updatePopular(url, data => ({
    openCount: data.openCount + 1,
    lastOpenAt: date,
  }));
};

export const usePopular = () => ({
  getPopular,
  getAllPopular,
  logPopular,
});
