import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { Button } from "../Button";
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

    // setIsDark(!isDark)
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
          {/* <div className={style.postsPanel}>
            <div className={style.allPosts}>
              <Link to="/category">All categories</Link>
            </div>
            <div className={style.privatePosts}>
              <Link to="/saverecipe">Save recipies</Link>
            </div>
          </div>
          <div> */}
          <div className={style.postsPanel}>
            <div className={style.allPosts}>
              <Link to="/category">All categories</Link>
              <Link to="/myshoplist">My shopping list</Link>
            </div>
          </div>
          <button className={style.logOut} onClick={logOut}>
            Log out
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
              <Link to="/category">All Categories</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/registration">Registration</Link>
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
