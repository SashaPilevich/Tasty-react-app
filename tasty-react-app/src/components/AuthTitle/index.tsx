import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../../App";
import style from "./style.module.css";
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
export const AuthTitle = () => {
  const { isDark } = useContext(Context);
  return (
    <div className={style.container}>
      <NavLink
        to="/login"
        className={({ isActive }) => getNavClassName(isDark, isActive)}
      >
        Войти
      </NavLink>
      <span>|</span>
      <NavLink
        to="/registration"
        className={({ isActive }) => getNavClassName(isDark, isActive)}
      >
        Регистрация
      </NavLink>
    </div>
  );
};
