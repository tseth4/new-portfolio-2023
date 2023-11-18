"use client";
import "./NavStyles.scss";
import Image from "next/image";
import sun_icon from "@/public/sun.svg";
import moon_icon from "@/public/moon.svg";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
// import Link from "next/link";

export default function NavTop() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTheme, setActiveTheme] = useState("dark");
  // const [selectedItem, setSelectedItem] = useState("home");

  console.log("pathname: ", pathname);
  // useLayoutEffect(() => {
  //   // let myTheme = localStorage.getItem("myTheme");
  //   let myTheme = localStorage.getItem("myTheme");
  //   if (myTheme) {
  //     setActiveTheme(myTheme);
  //   }
  // }, []);

  useEffect(() => {
    if (activeTheme) document.body.dataset.theme = activeTheme;
  }, [activeTheme]);

  const handleSetActiveTheme = (theme: string) => {
    localStorage.setItem("myTheme", theme);
    setActiveTheme(theme);
  };

  // useEffect(() => {
  //   setSelectedItem(isOnScreen);
  // }, [isOnScreen]);

  return (
    <>
      <div className={pathname != "/" ? "nav-top nav-top-back" : "nav-top"}>
        <div onClick={() => router.back()} className={pathname != "/" ? "nav-top__back-arrow" : "nav-top__back-arrow--hide"}></div>
        {/* <div className="nav-top__back-arrow"></div> */}
        {activeTheme === "light" ? (
          <div
            onClick={() => handleSetActiveTheme("dark")}
            className="nav-top__icon-container"
          >
            <Image
              priority
              width={20}
              height={20}
              src={sun_icon}
              alt="sun icon"
            />
          </div>
        ) : (
          <div
            onClick={() => handleSetActiveTheme("light")}
            className="nav-top__icon-container"
          >
            <Image
              priority
              width={20}
              height={20}
              src={moon_icon}
              alt="moon icon"
            />
          </div>
        )}
      </div>
    </>
  );
}
