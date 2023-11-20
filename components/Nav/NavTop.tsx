"use client";
import "./NavStyles.scss";
import Image from "next/image";
import sun_icon from "@/public/sun.svg";
import moon_icon from "@/public/moon.svg";
import atmos_icon from "@/public/atmos.svg";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Background from "@/components/Background/Background";

export default function NavTop() {
  const router = useRouter();
  const pathname = usePathname();
  const allThemes = ["dark", "light", "atmosphere"];
  const [activeTheme, setActiveTheme] = useState(0);

  useEffect(() => {
    console.log("activeTheme: ", allThemes[activeTheme]);
    document.body.dataset.theme = allThemes[activeTheme];
  }, [activeTheme]);

  const handleSetActiveTheme = (theme: number) => {
    console.log("theme: ", theme);
    // localStorage.setItem("myTheme", theme.toString());
    setActiveTheme(theme);
  };

  return (
    <>
      <Background />
      <div className={pathname != "/" ? "nav-top nav-top-back" : "nav-top"}>
        <div
          onClick={() => router.back()}
          className={
            pathname != "/" ? "nav-top__back-btn" : "nav-top__back-btn--hide"
          }
        >
          <div
            className={
              pathname != "/"
                ? "nav-top__back-arrow"
                : "nav-top__back-arrow--hide"
            }
          ></div>
          <span>BACK</span>
        </div>
        {/* <div className="nav-top__back-arrow"></div> */}
        {activeTheme === 1 ? (
          <div
            onClick={() => handleSetActiveTheme(2)}
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
        ) : activeTheme === 0 ? (
          <div
            onClick={() => handleSetActiveTheme(1)}
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
        ) : activeTheme === 2 ? (
          <div
            onClick={() => handleSetActiveTheme(0)}
            className="nav-top__icon-container"
          >
            <Image
              priority
              width={20}
              height={20}
              src={atmos_icon}
              alt="atmosphere icon"
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
