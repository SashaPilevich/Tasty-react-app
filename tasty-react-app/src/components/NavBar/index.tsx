import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { DarkModeToggle } from "../DarkModeToggle";
import img from "./Iconlogout.svg";
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
    navigate("/");
    setUser(null);
    localStorage.clear();
  };

  return (
    <>
      {user ? (
        <div className={style.container}>
          <div className={style.postsPanel}>
            <div className={style.allPosts}>
              <Link to="/category">All categories</Link>
              <Link to="/myshoplist">My shopping list</Link>
            </div>
          </div>
          <div className={style.loginToggle}>
            <DarkModeToggle inputChecked={isDark} onChange={handleOnChange} />
            <button className={style.logOut} onClick={logOut}>
              Log out
            </button>
            <img
              className={style.logoutImage}
              src={img}
              alt="icon logout"
            ></img>
          </div>
        </div>
      ) : (
        <div className={style.linkContainer}>
          <ul>
            <li className={style.link}>
              <Link to="/category">All Categories</Link>
            </li>
            <li className={style.link}>
              <Link to="/login">Login</Link>
            </li>
            <li className={style.link}>
              <Link to="/registration">Registration</Link>
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
