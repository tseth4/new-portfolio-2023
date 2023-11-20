"use client";
import "./HomeStyles.scss";
import NavSide from "@/components/Nav/NavSide";
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

export default function Home() {
  const navRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();

  const [localRefs, setLocalRefs] = useState<OberserverTypes>({});

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

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let refsArr = Object.values(localRefs);
    const ctx = gsap.context(() => {
      refsArr.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section.current,
          start: "top 50vh",
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
    let selectedElement = localRefs[`${title}Ref`]?.current;
    if (selectedElement) {
      selectedElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <main ref={homeRef} className="home">
      {/* <div className="home__bg"></div> */}
      <NavSide
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
