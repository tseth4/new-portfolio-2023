"use client";
import React, { useEffect, useRef } from "react";
import "./SplashStyles.scss";
import splash_tristan from "@/public/SPLASH_TRISTAN.svg";
import Image from "next/image";
import { gsap } from "gsap";

export default function Splash() {
  const splashTristanTop = useRef(null);
  const splashTristanBottom = useRef(null);

  useEffect(() => {
    gsap.to(splashTristanTop.current, {
      duration: 1,
      x: 10,
      y: -10,
    });
  }, [splashTristanTop.current]);

  useEffect(() => {
    gsap.to(splashTristanBottom.current, {
      duration: 1,
      x: -10,
      y: 10,
    });
  }, [splashTristanBottom.current]);

  return (
    <div className="splash">
      <div ref={splashTristanTop} className="splash__image">
        <Image
          priority
          width={706.5}
          height={510.5}
          src={splash_tristan}
          alt="splash image"
        />
      </div>
      <div className="splash__image">
        <Image
          priority
          width={706.5}
          height={510.5}
          src={splash_tristan}
          alt="splash image"
        />
      </div>
      <div ref={splashTristanBottom} className="splash__image">
        <Image
          priority
          width={706.5}
          height={510.5}
          src={splash_tristan}
          alt="splash image"
        />
      </div>
    </div>
  );
}
