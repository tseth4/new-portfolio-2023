import { useEffect, useState, useRef, RefObject } from "react";
import { OnScreenTypes } from "@/app/page";

export default function useOnScreen({ refs, root }: OnScreenTypes) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  // const [isOnScreen, setIsOnScreen] = useState(Object.keys(refs)[0]);
  const [isOnScreen, setIsOnScreen] = useState("splash");

  console.log("root: ", root?.current)

  const options = {
    // root: root?.current,
    threshold: [0.51],
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry, " is intersecting")
          if (entry.target.getAttribute("data-ref")) {
            let dataRefStr = entry.target.getAttribute("data-ref");
            if (dataRefStr) {
              setIsOnScreen(dataRefStr);
            }
          }
        }
      }, options);
    });
  }, []);

  useEffect(() => {
    for (const ref in refs) {
      if (observerRef.current && refs[ref].current) {
        const element: HTMLElement | null = refs[ref].current;
        if (element) observerRef.current.observe(element);
      }
    }
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [refs]);

  return isOnScreen;
}
