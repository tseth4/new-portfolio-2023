import { forwardRef } from "react";
import NavData from "@/data/nav-data.json";
import "./NavStyles.scss";

interface NavSideProps {
  handleNavigation: (title: string) => void;
  // isOnScreen: string;
}

export type Ref = HTMLDivElement;

const NavSide = forwardRef<HTMLDivElement, NavSideProps>(
  (props, ref): JSX.Element => {
    const { handleNavigation } = props;

    const handleNavClick = (title: string) => {
      handleNavigation(title);
      // router.push(`/#${title}`);
    };
    return (
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
    );
  }
);

export default NavSide;
