import { useRef, useEffect } from "react";

function useOuterClick(callback: (x: any) => void) {
  const innerRef = useRef<any>();
  const callbackRef = useRef<(x: any) => void | undefined>();

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);

    function handleClick(e: any) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      ) {
        callbackRef.current(e);
      }
    }
  }, []);

  return innerRef;
}

export default useOuterClick;
