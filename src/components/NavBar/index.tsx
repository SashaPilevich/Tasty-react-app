import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { DarkModeToggle } from "../DarkModeToggle";
import { iconLogOut } from "../../assets";
import style from "./style.module.css";

export const NavBar = () => {
  const { isDark, setIsDark, user, setUser } = useContext(Context);
  const navigate = useNavigate();
  const handleOnChange = () => {
    if (isDark) {
      setIsDark(false);
    } else {
      setIsDark(true);
    }
  };
  const logOut = () => {
    navigate("/category");
    setUser(false);
    localStorage.clear();
  };

  return (
    <>
      {user ? (
        <div className={style.container}>
          <div className={style.postsPanel}>
            <div className={style.allPosts}>
              <Link to="/category">Все категории</Link>
              <Link to="/myshoplist">Мой шоппинг лист</Link>
            </div>
          </div>
          <div className={style.loginToggle}>
            <DarkModeToggle inputChecked={isDark} onChange={handleOnChange} />
            <button className={style.logOut} onClick={logOut}>
              Выйти
            </button>
            <img
              className={style.logoutImage}
              src={iconLogOut}
              alt="icon logout"
            ></img>
          </div>
        </div>
      ) : (
        <div className={style.linkContainer}>
          <ul>
            <li className={style.link}>
              <Link to="/category">Все категории</Link>
            </li>
            <li className={style.link}>
              <Link to="/login">Войти</Link>
            </li>
            <li className={style.link}>
              <Link to="/registration">Регистрация</Link>
            </li>
          </ul>
          <div className={style.dark}>
            <DarkModeToggle inputChecked={isDark} onChange={handleOnChange} />
          </div>
        </div>
      )}
    </>
  );
};
