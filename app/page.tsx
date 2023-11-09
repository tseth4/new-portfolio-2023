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
    const tl = gsap.timeline;

    const ctx = gsap.context(() => {
      tl({
        scrollTrigger: {
          trigger: postsRef.current,
          start: "top center",
          end: "+=5",
          scrub: true,
        },
      })
        .to(".nav-side__rectangle-shape[data-title='posts']", {
          className:
            "nav-side__rectangle-shape nav-side__rectangle-shape--selected",
        }, 0)
        .to(".nav-side__item[data-title='posts']", {
          className: "nav-side__item nav-side__item--selected",
        }, 0);
      tl({
        scrollTrigger: {
          trigger: splashRef.current,
          start: "top center",
          scrub: true,
        },
      })
        .to(".nav-side__rectangle-shape[data-title='splash']", {
          className:
            "nav-side__rectangle-shape nav-side__rectangle-shape--selected",
        }, 0)
        .to(".nav-side__item[data-title='splash']", {
          className: "nav-side__item nav-side__item--selected",
        }, 0);
      tl({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top center",
          scrub: true,
        },
      })
        .to(".nav-side__rectangle-shape[data-title='about']", {
          className:
            "nav-side__rectangle-shape nav-side__rectangle-shape--selected",
        }, 0)
        .to(".nav-side__item[data-title='about']", {
          className: "nav-side__item nav-side__item--selected",
        }, 0);
    }, homeRef);
    return () => ctx.revert();
  }, []);

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
