import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          //console.log("Click Outside");
          handler();
        }
      }

      // IMPORTANCE of Capturing PHase here
      // as event bubbles by default
      // the window opens for a split secnd and closes
      // that's why want to handle at capturing phase

      document.addEventListener("click", handleClick, listenCapturing);

      return () => document.removeEventListener("click", handleClick);
    },
    [handler, listenCapturing]
  );
  return ref;
}
