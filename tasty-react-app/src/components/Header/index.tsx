import { useState } from "react";
import { NavBar } from "../NavBar";
import style from "./style.module.css";

export const Header = () => {
  const [clickMenu, setClickMenu] = useState(false);
  const [linearStyle, setLinearStyle] = useState("linear");
  const [headerStyle, setHeaderStyle] = useState("header");
  const [navStyle, setNavStyle] = useState("navBar");

  const handleOpen = () => {
    if (!clickMenu) {
      openNavBar();
    } else {
      closeNavBar();
    }
  };
  const openNavBar = () => {
    setLinearStyle("open");
    setClickMenu(true);
    setHeaderStyle("headerMax");
    setNavStyle("navOpen");
  };
  const closeNavBar = () => {
    setNavStyle("navbar");
    setHeaderStyle("header");
    setLinearStyle("linear");

    setTimeout(() => {
      setClickMenu(false);
    }, 500);
  };

  return (
    <header className={style[headerStyle]}>
      <div className={style.visible}>
        <div className={style.burgerMenu} onClick={handleOpen}>
          <div className={style[linearStyle]}></div>
        </div>
      </div>
      {clickMenu ? (
        <nav className={style[navStyle]}>
          <NavBar />{" "}
        </nav>
      ) : null}
    </header>
  );
};
