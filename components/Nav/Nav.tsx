"use client";
import "./NavStyles.scss";
import Image from "next/image";
import sun_icon from "@/public/sun.svg";
import moon_icon from "@/public/moon.svg";
import { useEffect, useState, forwardRef, useLayoutEffect } from "react";
import NavData from "@/data/nav-data.json";
// import { useRouter, usePathname } from "next/navigation";

interface NavProps {
  handleNavigation: (title: string) => void;
  // isOnScreen: string;
}

export type Ref = HTMLDivElement;

const Nav = forwardRef<HTMLDivElement, NavProps>((props, ref): JSX.Element => {
  const { handleNavigation } = props;
  // const pathname = usePathname();
  const [activeTheme, setActiveTheme] = useState("dark");
  // const [selectedItem, setSelectedItem] = useState("home");

  // console.log("pathname: ", pathname);
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

  const handleNavClick = (title: string) => {
    handleNavigation(title);
    // router.push(`/#${title}`);
  };

  // useEffect(() => {
  //   setSelectedItem(isOnScreen);
  // }, [isOnScreen]);

  return (
    <>
      <div className="nav-side">
        {NavData.nav.map((item, id) => (
          <div data-title={item.title} key={id} className={"nav-side__item"}>
            <div
              data-title={item.title}
              className={"nav-side__rectangle-shape"}
            ></div>
            <div
              className="nav-side__rectangle-title"
              onClick={() => handleNavClick(item.title)}
            >
              {item.title === "splash" ? "HOME" : item.title.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
      <div ref={ref} className="nav-top">
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
});

export default Nav;
