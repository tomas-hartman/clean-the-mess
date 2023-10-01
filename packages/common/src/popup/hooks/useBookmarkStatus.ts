import { useState, useEffect } from "react";
import { Tabs } from "webextension-polyfill";
import { getBookmarkStatus } from "../../_modules";

type BookmarkStatus = 'hidden' | 'bookmarked' | 'bookmark-close';

export const useBookmarkStatus = ({ tab }: { tab: Tabs.Tab }) => {
  const [bookmarkStatus, setBookmarkStatus] = useState<BookmarkStatus | null>(null);

  const isBookmarked = bookmarkStatus === "bookmarked";

  useEffect(() => {
    (async () => {
      const bookmarkResult = await getBookmarkStatus(tab);

      if (bookmarkResult !== bookmarkStatus) {
        setBookmarkStatus(bookmarkResult);
      }
    })();
  }, [bookmarkStatus, tab]);

  return { bookmarkStatus, isBookmarked }
}