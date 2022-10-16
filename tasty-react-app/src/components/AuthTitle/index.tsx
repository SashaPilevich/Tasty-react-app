import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../../App";
import style from "./style.module.css";
export const AuthTitle = () => {
  const { isDark } = useContext(Context);
  return (
    <div className={style.container}>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          !isDark
            ? isActive
              ? style.active_link
              : style.unactive
            : isActive
            ? style.darkActiveLink
            : style.darkUnactive
        }
      >
        Login
      </NavLink>
      <span>|</span>
      <NavLink
        to="/registration"
        className={({ isActive }) =>
          !isDark
            ? isActive
              ? style.active_link
              : style.unactive
            : isActive
            ? style.darkActiveLink
            : style.darkUnactive
        }
      >
        Registration
      </NavLink>
    </div>
  );
};
