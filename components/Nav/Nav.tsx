"use client";
import "./NavStyles.scss";
import Image from "next/image";
import sun_icon from "@/public/sun.svg";
import moon_icon from "@/public/moon.svg";
import { useEffect, useState } from "react";
// import { gsap } from "gsap";
import NavData from "@/data/nav-data.json";
import { useRouter, usePathname } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();

  const [activeTheme, setActiveTheme] = useState("dark");
  const inactiveTheme = activeTheme === "light" ? "dark" : "light";
  const [selectedItem, setSelectedItem] = useState("home");

  console.log("pathname: ", pathname);

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
  }, [activeTheme]);

  const handleNavClick = (title: string) => {
    console.log(title);
    setSelectedItem(title);
    router.push(`/#${title}`);
  };

  // useEffect(() => {}, []);

  return (
    <>
      <div
        // ref={myElement}
        className="nav-side"
      >
        {NavData.nav.map((item, id) => (
          <div
            key={id}
            className={
              selectedItem === item.title
                ? "nav-side__item nav-side__item--selected"
                : "nav-side__item"
            }
          >
            <div
              className={
                selectedItem === item.title
                  ? "nav-side__rectangle-shape nav-side__rectangle-shape--selected"
                  : "nav-side__rectangle-shape"
              }
            ></div>
            <div
              className="nav-side__rectangle-title"
              onClick={() => handleNavClick(item.title)}
            >
              {item.title.toUpperCase()}
            </div>
          </div>
        ))}
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
