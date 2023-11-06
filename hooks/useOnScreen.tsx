import { useEffect, useState, useRef, RefObject } from "react";
import { OnScreenOberserverTypes } from "@/app/page";

// pass an object of useRefs and
// export default function useOnScreen(ref: RefObject<HTMLElement>) {
export default function useOnScreen(refs: OnScreenOberserverTypes) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isOnScreen, setIsOnScreen] = useState("home");

  useEffect(() => {
    // save this overserver ref to the current ref
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // console.log("entry: ", entry.target.className);
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            console.log("entry is intersecting: ", entry.target.getAttribute('data-ref'));
            if (entry.target.getAttribute('data-ref')){
              let dataRefStr = entry.target.getAttribute('data-ref');
              if (dataRefStr){
                setIsOnScreen(dataRefStr)
              }
            }
          }
          // setIsOnScreen(entry.isIntersecting)
        });
      },
      { threshold: 1.0 }
    );
  }, []);

  useEffect(() => {
    // if there is an observer ref and current ref
    // we are going to use this ref to observe the ref arg
    // if (observerRef.current && ref.current) {
    //   observerRef.current.observe(ref.current);
    // }
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
