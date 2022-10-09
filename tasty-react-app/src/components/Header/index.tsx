import style from "./style.module.css";
import img from "./ico.svg";
import { useContext, useState } from "react";
import { NavBar } from "../NavBar";
import { Context } from "../../App";

export const Header = () => {
  const [clickMenu, setClickMenu] = useState(false);
  const [headerStyle, setHeaderStyle] = useState("header");
  const [menuStyle, setMenuStyle] = useState("visible");
  const [navStyle, setNavStyle] = useState("hiddenNav");
  const [linearStyle, setLinearStyle] = useState("linear");
  const styleHiddenMenu = () => {
    setMenuStyle("hidden");
  };
  const styleVisibleNav = () => {
    setNavStyle("visibleNav");
    setHeaderStyle("headerMax");
  };
  const openNavBar = () => {
    if (!clickMenu) {
      setLinearStyle("open");
      setTimeout(styleHiddenMenu, 500);
      setTimeout(styleVisibleNav, 500);
    }
    setClickMenu(true);
  };
  const closeNavBar = () => {
    if (clickMenu) {
      setMenuStyle("visible");
      setNavStyle("hiddenNav");
      setHeaderStyle("header");
      setClickMenu(false);
      setLinearStyle("linear");
    }
  };
  return (
    <header className={style[headerStyle]}>
      <div className={style[menuStyle]}>
        <div className={style.burgerMenu} onClick={openNavBar}>
          <div className={style[linearStyle]}></div>
        </div>
      </div>
      {clickMenu ? (
        <div className={style[navStyle]}>
          <NavBar onClose={closeNavBar} />
        </div>
      ) : null}
    </header>
  );
};
