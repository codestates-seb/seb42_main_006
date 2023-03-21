import { useState } from "react";

export default function useSessionStorage(key: string) {
  const [value, setValue] = useState(() => sessionStorage.getItem(key) || null);

  return [value];
}
