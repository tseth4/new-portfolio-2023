"use client";
import "./HomeStyles.scss";
import Nav from "@/components/Nav/Nav";
import Splash from "@/components/Splash/Splash";
import Posts from "@/components/Posts/Posts";
import About from "@/components/About/About";
import {
  useRef,
  RefObject,
  useEffect,
  createRef,
  useState,
  useLayoutEffect,
} from "react";
// import useOnScreen from "@/hooks/useOnScreen";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export interface OberserverTypes {
  [key: string]: RefObject<HTMLElement>;
}

// export interface OnScreenTypes {
//   refs: OberserverTypes;
//   root: RefObject<HTMLElement>;
// }

// interface ObserverOptionTypes {
//   threshold?: string | number | number[];
//   root?: HTMLElement | null;
// }

export default function Home() {
  // const tl = useRef(timeline);

  const navRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();

  const [localRefs, setLocalRefs] = useState<OberserverTypes>({});
  // const [isOnScreen, setIsOnScreen] = useState("");
  // Do I need to use useState
  // const [observerOptions, setObserverOptions] = useState<ObserverOptionTypes>({
  //   threshold: [1],
  //   // root: navRef?.current,
  // });

  const observerRef = useRef<IntersectionObserver | null>(null);

  const postsRef = useRef<null | HTMLDivElement>(null);
  const aboutRef = useRef<null | HTMLDivElement>(null);
  const splashRef = useRef<null | HTMLDivElement>(null);
  const homeRef = useRef<null | HTMLDivElement>(null);

  // useEffect(() => {
  //   // setObserverOptions({ ...observerOptions, root: navRef.current });
  // }, [navRef.current]);

  useEffect(() => {
    setLocalRefs({
      splashRef,
      aboutRef,
      postsRef,
    });
  }, [splashRef, aboutRef, postsRef]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let refsArr = Object.values(localRefs);
    const ctx = gsap.context(() => {
      refsArr.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section.current,
          start: "top center",
          onToggle: (self) => {
            gsap.to(
              `.nav-side__rectangle-shape[data-title=${section.current?.dataset.ref}]`,
              {
                duration: 0.2,
                backgroundColor: self.isActive
                  ? "var(--nav-primary-text-color)"
                  : "var(--nav-secondary-text-color)",
                boxShadow: self.isActive
                  ? " 0px 0px 1rem var(--nav-primary-text-color)"
                  : "",
              }
            );
            gsap.to(
              `.nav-side__item[data-title=${section.current?.dataset.ref}]`,
              {
                duration: 0.2,
                color: self.isActive
                  ? "var(--nav-primary-text-color)"
                  : "var(--nav-secondary-text-color)", // if active then white or else black
              }
            );
          },
        });
      });
    }, homeRef);
    return () => ctx.revert();
  }, [localRefs]);

  const handleNavigation = (title: string) => {
    console.log("title: ", title);
    let selectedElement = localRefs[`${title}Ref`]?.current;
    if (selectedElement) {
      selectedElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <main ref={homeRef} className="home">
      <Nav
        ref={navRef}
        // isOnScreen={isOnScreen}
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
