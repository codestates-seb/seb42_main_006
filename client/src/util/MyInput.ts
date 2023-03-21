import { useState } from "react";

type UseInputTypes = [
  string,
  object,
  React.Dispatch<React.SetStateAction<string>>
];

export default function useInput(initial: string): UseInputTypes {
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
