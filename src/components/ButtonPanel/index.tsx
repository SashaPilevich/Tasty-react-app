import { MouseEventHandler, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { shopList } from "../../assets";
import { Button } from "../Button";
import style from "./style.module.css";
interface IButtonPanel {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
export const ButtonPanel = (props: IButtonPanel) => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const goToShopList = () => {
    navigate("/myshoplist");
  };
  return (
    <div className={style.btnPanel}>
      <div className={style.forBtnBack}>
        <Button label={"Назад"} onClick={props.onClick} type="btnBack" />
      </div>
      {user ? (
        <div className={style.forBtnShopList} onClick={goToShopList}>
          <Button
            label={"Шоппинг лист"}
            onClick={goToShopList}
            type="btnShopList"
          />
          <img className={style.ico} src={shopList} alt="shopList"></img>
        </div>
      ) : null}
    </div>
  );
};
