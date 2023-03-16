import { useState } from "react";

export default function useInput(
  initial: string
): [string, object, React.Dispatch<React.SetStateAction<string>>] {
  const [value, setValue] = useState(initial);

  const bind = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value),
  };

  const reset = () => {
    setValue(initial);
  };

  return [value, bind, reset];
}
