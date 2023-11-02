"use client";
import "./NavStyles.scss";
import Image from "next/image";
import sun_icon from "@/public/sun.svg";
import moon_icon from "@/public/moon.svg";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Nav() {
  const [activeTheme, setActiveTheme] = useState("light");
  const inactiveTheme = activeTheme === "light" ? "dark" : "light";

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
  }, [activeTheme]);

  const myElement = useRef(null);

  // const myElement = document.querySelector(".nav-side");
  gsap.to(myElement.current, {
    duration: 1,
    x: 100,
  });
  return (
    <>
      <div ref={myElement} className="nav-side">
        side nav
      </div>
      <div className="nav-top">
        <div
          onClick={() => setActiveTheme(inactiveTheme)}
          className="nav-top__icon-container"
        >
          {activeTheme === "light" ? (
            <Image
              priority
              width={20}
              height={20}
              src={sun_icon}
              alt="sun icon"
            />
          ) : (
            <Image
              priority
              width={20}
              height={20}
              src={moon_icon}
              alt="moon icon"
            />
          )}
        </div>
      </div>
    </>
  );
}
