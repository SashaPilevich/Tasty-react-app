import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../App";
import { Button } from "../Button";
import { DarkModeToggle } from "../DarkModeToggle";
import img from "./Iconlogout.svg";
import style from "./style.module.css";

interface IProps {
  onClose: () => void;
}
export const NavBar = ({ onClose }: IProps) => {
  const { isDark, setIsDark } = useContext(Context);

  const handleOnChange = () => {
    if (isDark) {
      setIsDark(false);
    } else {
      setIsDark(true);
    }
    // setIsDark(!isDark)
  };

  return (
    <div className={style.listContainer}>
      <div className={style.burgerMenuNav} onClick={onClose}>
        <span className={style.linearNav1}></span>
        <span className={style.linearNav2}></span>
      </div>
      <ul>
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
    </div>
  );
};
