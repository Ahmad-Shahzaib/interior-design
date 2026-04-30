import { useEffect, useState } from "react";

const STORAGE_KEY = "lumiere-brand-name";

export const useBrandName = (
  pathname: string,
  search: string,
  isCustomPathName: boolean
) => {
  const queryName = (() => {
    const params = new URLSearchParams(search);
    const nameParam = params.get("name")?.trim();
    if (nameParam) return nameParam;

    const raw = search.startsWith("?") ? search.slice(1) : search;
    if (!raw) return null;
    if (raw.includes("=")) return null;

    return decodeURIComponent(raw).trim();
  })();

  const [storedName, setStoredName] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(STORAGE_KEY);
  });

  useEffect(() => {
    const nextName = queryName || (isCustomPathName ? pathname : null);
    if (!nextName) return;
    window.localStorage.setItem(STORAGE_KEY, nextName);
    setStoredName(nextName);
  }, [queryName, isCustomPathName, pathname]);

  return queryName || (isCustomPathName ? pathname : storedName) || "LUMIÈRE";
};
