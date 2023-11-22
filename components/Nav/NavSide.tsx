import NavData from "@/data/nav-data.json";
import "./NavStyles.scss";

interface NavSideProps {
  handleNavigation: (title: string) => void;
}

const NavSide = (props: NavSideProps) => {
  const { handleNavigation } = props;

  const handleNavClick = (title: string) => {
    handleNavigation(title);
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
};

export default NavSide;
