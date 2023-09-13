import { useState, useCallback } from "react";
import { Tabs } from "webextension-polyfill";
import { search } from "../../_modules";

export const useSearch = ({ tabs }: { tabs: Tabs.Tab[] }) => {
  const [result, setResult] = useState<Tabs.Tab[]>([]);

  const performSearch = useCallback(
    (searchTerm: string) => {
      const result = search.perform(tabs, searchTerm);

      setResult(result);
    },
    [tabs],
  );

  return { search: performSearch, result }
}