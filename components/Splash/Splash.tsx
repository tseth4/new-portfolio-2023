"use client";
import React, { useLayoutEffect, useRef } from "react";
import "./SplashStyles.scss";
import SplashTristan from "./SplashTristan";
// import Image from "next/image";
import { gsap } from "gsap";

export default function Splash() {
  const splashTristanTop = useRef(null);
  const splashTristanBottom = useRef(null);

  useLayoutEffect(() => {
    gsap.to(".splash__image", { opacity: 1 });
    gsap.to(splashTristanTop.current, {
      duration: 1,
      x: 9,
      y: -9,
    });
    gsap.to(splashTristanBottom.current, {
      duration: 1,
      x: -9,
      y: 9,
    });
  }, []);

  useLayoutEffect(() => {
    // gsap.to(splashTristanBottom.current, {
    //   duration: 1,
    //   x: -9,
    //   y: 9,
    // });
  }, []);

  return (
    <div className="splash">
      <div ref={splashTristanTop} className="splash__image">
        <SplashTristan
          // width={838}
          // height={838}
          strokeColor={"var(--splash-color)"}
          strokeWidth={1}
          // fillColor={"var(--primary-text-color)"}
        />
      </div>
      <div className="splash__image">
        <SplashTristan
          // width={838}
          // height={838}
          strokeColor={"var(--splash-color)"}
          strokeWidth={1}
          // fillColor={"var(--primary-text-color)"}
        />
      </div>
      <div ref={splashTristanBottom} className="splash__image">
        <SplashTristan
          // width={838}
          // height={838}
          strokeColor={"var(--primary-text-color)"}
          strokeWidth={1}
          // fillColor={"var(--primary-text-color)"}
        />
      </div>
    </div>
  );
}
