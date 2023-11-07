"use client";
import "./HomeStyles.scss";
import Nav from "@/components/Nav/Nav";
import Splash from "@/components/Splash/Splash";
import Posts from "@/components/Posts/Posts";
import About from "@/components/About/About";
import { useRef, RefObject, useEffect, createRef, useState } from "react";
// import useOnScreen from "@/hooks/useOnScreen";

export interface OberserverTypes {
  [key: string]: RefObject<HTMLElement>;
}

export interface OnScreenTypes {
  refs: OberserverTypes;
  root: RefObject<HTMLElement>;
}

interface ObserverOptionTypes {
  threshold: string | number | number[];
  root: HTMLElement | null;
}

export default function Home() {
  const navRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();

  const [localRefs, setLocalRefs] = useState<OberserverTypes>({});
  const [isOnScreen, setIsOnScreen] = useState("splash");
  // Do I need to use useState
  const [observerOptions, setObserverOptions] = useState<ObserverOptionTypes>({
    threshold: [0.51],
    root: navRef?.current,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);

  const postsRef = useRef<null | HTMLDivElement>(null);
  const aboutRef = useRef<null | HTMLDivElement>(null);
  const splashRef = useRef<null | HTMLDivElement>(null);
  const homeRef = useRef<null | HTMLDivElement>(null);


  useEffect(() => {
    setLocalRefs({
      splashRef,
      aboutRef,
      postsRef,
    });
  }, [splashRef, aboutRef, postsRef]);

  useEffect(() => {
    if (navRef.current) {
      setObserverOptions({
        ...observerOptions,
        root: navRef.current,
      });
    }
  }, []);

  useEffect(() => {
    console.log("localRefs:", localRefs);
  }, [localRefs]);

  useEffect(() => {
    // setLocalRefs({ hello: "world" });
    for (const ref in localRefs) {
      if (observerRef.current && localRefs[ref].current) {
        const element: HTMLElement | null = localRefs[ref].current;
        if (element) observerRef.current.observe(element);
      }
    }
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [localRefs]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry, " is intersecting");
          if (entry.target.getAttribute("data-ref")) {
            let dataRefStr = entry.target.getAttribute("data-ref");
            if (dataRefStr) {
              setIsOnScreen(dataRefStr);
            }
          }
        }
      }, observerOptions);
    });
  }, [observerOptions]);

  const handleNavigation = (title: string) => {
    if (title === "posts" && postsRef.current) {
      console.log(typeof postsRef.current);
      postsRef.current.scrollIntoView({
        behavior: "smooth",
      });
    } else if (title === "about" && aboutRef.current) {
      aboutRef.current.scrollIntoView({
        behavior: "smooth",
      });
    } else if (title === "splash" && homeRef.current) {
      homeRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <main ref={homeRef} className="home">
      <Nav
        ref={navRef}
        isOnScreen={isOnScreen}
        handleNavigation={handleNavigation}
      />
      <div
        data-ref="splash"
        ref={splashRef}
        id="splash"
        className="home__splash"
      >
        <Splash />
      </div>
      <div data-ref="posts" ref={postsRef} id="posts" className="home__posts">
        <Posts posts={3} />
      </div>
      <div data-ref="about" ref={aboutRef} id="about" className="home__about">
        <About />
      </div>
    </main>
  );
}
