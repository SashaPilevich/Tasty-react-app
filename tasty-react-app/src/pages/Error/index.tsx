import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
import error from "./error.jpg";

export const Error = () => {
  const navigate = useNavigate();
  const returnBack = () => {
    navigate("/");
  };
  return (
    <div className={style.container}>
      <div className={style.btnContainer}>
        <button onClick={returnBack} className={style.btn}>
          на главную
        </button>
      </div>
    </div>
  );
};
