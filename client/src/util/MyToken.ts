import { useState } from "react";

export default function useSessionStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? item : initial;
    } catch (error) {
      console.log(error);
      return initial;
    }
  });

  const setStorage = (item: T) => {
    try {
      setValue(item);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(key, JSON.stringify(item));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [value, setStorage] as const;
}
