"use client";
import "./HomeStyles.scss";
import Nav from "@/components/Nav/Nav";
import Splash from "@/components/Splash/Splash";
import Posts from "@/components/Posts/Posts";
import { useRef, RefObject, useEffect } from "react";
import useOnScreen from "@/hooks/useOnScreen";

export interface OnScreenOberserverTypes {
  [key: string]: RefObject<HTMLElement>;
}

export default function Home() {
  const postsRef = useRef<null | HTMLDivElement>(null);
  const aboutRef = useRef<null | HTMLDivElement>(null);
  const homeRef = useRef<null | HTMLDivElement>(null);

  const isOnScreen = useOnScreen({
    postsRef,
    aboutRef,
    homeRef,
  });
  console.log("isOnSCreen:", isOnScreen);

  useEffect(() => {

  }, [isOnScreen])

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
    } else if (title === "home" && homeRef.current) {
      homeRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="home">
      <Nav isOnScreen={isOnScreen} handleNavigation={handleNavigation} />
      <div data-ref="home" ref={homeRef} id="home" className="home__splash">
        <Splash />
      </div>
      <div data-ref="posts" ref={postsRef} id="posts" className="home__posts">
        <Posts />
      </div>
      <div data-ref="about" ref={aboutRef} id="about" className="home__about">
        About
      </div>
    </main>
  );
}
