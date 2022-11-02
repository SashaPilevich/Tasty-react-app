import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../../App";
import style from "./style.module.css";

export const AuthTitle = () => {
  const { isDark } = useContext(Context);
  const getNavClassName = (isDark: boolean, isActive: boolean) => {
    if (isActive) {
      if (isDark) {
        return style.darkActiveLink;
      } else {
        return style.active_link;
      }
    } else {
      if (isDark) {
        return style.darkUnactive;
      } else {
        return style.unactive;
      }
    }
  };
  return (
    <div className={style.container}>
      <NavLink
        to="/login"
        className={({ isActive }) => getNavClassName(isDark, isActive)}
      >
        Login
      </NavLink>
      <span>|</span>
      <NavLink
        to="/registration"
        className={({ isActive }) => getNavClassName(isDark, isActive)}
      >
        Registration
      </NavLink>
    </div>
  );
};
