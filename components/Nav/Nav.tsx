"use client";
import "./NavStyles.scss";
import Image from "next/image";
import sun_icon from "@/public/sun.svg";
import moon_icon from "@/public/moon.svg";
import { useEffect, useState } from "react";

export default function Nav() {
  const [activeTheme, setActiveTheme] = useState("light");
  const inactiveTheme = activeTheme === "light" ? "dark" : "light";

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
  }, [activeTheme]);
  return (
    <>
      <div className="nav-side">side nav</div>
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
