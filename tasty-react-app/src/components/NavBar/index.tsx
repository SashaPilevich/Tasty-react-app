import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { DarkModeToggle } from "../DarkModeToggle";
import img from "./Iconlogout.svg";
import style from "./style.module.css";

interface IProps {
  onClose: () => void;
}
export const NavBar = ({ onClose }: IProps) => {
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
    navigate("/");
    setUser(null);
    localStorage.clear();
  };

  return (
    <div className={style.listContainer}>
      <div className={style.burgerMenuNav} onClick={onClose}>
        <span className={style.linearNav1}></span>
        <span className={style.linearNav2}></span>
      </div>
      {user ? (
        <div className={style.container}>
          <div className={style.postsPanel}>
            <div className={style.allPosts}>
              <Link to="/category">Все категории</Link>
              <Link to="/myshoplist">Мой шоппинг лист</Link>
            </div>
          </div>
          <button className={style.logOut} onClick={logOut}>
            Выйти
          </button>
          <img className={style.logoutImage} src={img} alt="icon logout"></img>
          <div className={style.loginToggle}>
            <DarkModeToggle inputChecked={isDark} onChange={handleOnChange} />
          </div>
        </div>
      ) : (
        <>
          <ul>
            <li>
              <Link to="/category">Все категории</Link>
            </li>
            <li>
              <Link to="/login">Войти</Link>
            </li>
            <li>
              <Link to="/registration">Регистрация</Link>
            </li>
          </ul>
          <div className={style.dark}>
            <DarkModeToggle inputChecked={isDark} onChange={handleOnChange} />
          </div>
        </>
      )}
    </div>
  );
};
