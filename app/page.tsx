"use client";
import "./HomeStyles.scss";
import NavSide from "@/components/Nav/NavSide";
import Posts from "@/components/Posts/Posts";
import About from "@/components/About/About";
import {
  useRef,
  RefObject,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Splash2 from "@/components/Splash/Splash2";
import Footer from "@/components/Footer/Footer";

export interface OberserverTypes {
  [key: string]: RefObject<HTMLElement>;
}

export default function Home() {
  const [localRefs, setLocalRefs] = useState<OberserverTypes>({});

  const postsRef = useRef<null | HTMLDivElement>(null);
  const aboutRef = useRef<null | HTMLDivElement>(null);
  const splashRef = useRef<null | HTMLDivElement>(null);
  const homeRef = useRef<null | HTMLDivElement>(null);
  const tl = useRef<null | gsap.core.Timeline>();

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
      tl.current = gsap.timeline({ defaults: { duration: 0.5 } });

      tl.current
        .to(".nav-side__rectangle-shape", { height: "7rem" }, 0)
        .to(".nav-side__rectangle-title", { opacity: 1 }, 0.5)
        .to(".splash2__intro", { top: 0, opacity: 1, duration: 0.4 }, 0.5)
        .to(".splash2__name", { top: 0, opacity: 1, duration: 0.4 }, 0.6)
        .to(".splash2__description", { top: 0, opacity: 1, duration: 0.4 }, 0.7)
        .to(".footer__cv", { top: 0 }, 0.8)
        .to(".footer__github", { top: 0 }, 0.9)
        .to(".footer__codepen", { top: 0 }, 1)
        .to(".footer__linkedin", { top: 0 }, 1.1);

      refsArr.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section.current,
          start: "top 50vh", // when top of trigger is 50%vh of the view port
          onToggle: (self) => {
            gsap.to(
              `.nav-side__rectangle-shape[data-title=${section.current?.dataset.ref}]`,
              {
                duration: 0.2,
                backgroundColor: self.isActive
                  ? "var(--nav-rect-bg-color)"
                  : "transparent",
                boxShadow: self.isActive
                  ? " 0px 0px 1rem var(--nav-rect-shadow-color)"
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
      <NavSide handleNavigation={handleNavigation} />
      <div
        data-ref="splash"
        ref={splashRef}
        id="splash"
        className="home__splash"
      >
        <Splash2 />
      </div>
      <div data-ref="posts" ref={postsRef} id="posts" className="home__posts">
        <Posts numberOfPosts={4} />
      </div>
      <div data-ref="about" ref={aboutRef} id="about" className="home__about">
        <About />
      </div>
      <Footer />
    </main>
  );
}
