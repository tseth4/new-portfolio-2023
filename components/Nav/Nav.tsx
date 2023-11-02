import "./NavStyles.scss";
import Image from "next/image";
import sun_icon from "@/public/sun.svg";
import moon_icon from "@/public/moon.svg";

export default function Nav() {
  return (
    <>
      <div className="nav-side">side nav</div>
      <div className="nav-top">
        <div>
          <Image
            priority
            width={20}
            height={20}
            src={moon_icon}
            alt="Sun icon"
          />
        </div>
      </div>
    </>
  );
}
