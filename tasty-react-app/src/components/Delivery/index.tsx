import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { Input } from "../Input";
import style from "./style.module.css";
import { NotificationManager } from "react-notifications";

export const Delivery = () => {
  const navigate = useNavigate();
  const submit = () => {
    NotificationManager.success("Ваш заказ оформлен.Ожидайте звонка менеджера");
    navigate("/category");
    localStorage.removeItem("shopList");
  };
  return (
    <div className={style.container}>
      <div className={style.address}>
        <h3 className={style.title}>Адрес доставки</h3>
        <div className={style.inputContainer}>
          <Input uniqType="delivery" label="Город/Улица" />
        </div>
        <div className={style.inputContainer}>
          <Input uniqType="delivery" label="Дом/Квартира" />
        </div>
        <div className={style.inputContainer}>
          <Input uniqType="delivery" label="Подъезд/Этаж" />
        </div>
        <div className={style.inputContainer}>
          <Input uniqType="delivery" label="Дата" type="date" />
        </div>
        <div className={style.inputContainer}>
          <Input uniqType="delivery" label="Номер телефона" type="tel" />
        </div>
      </div>
      <div className={style.pay}>
        <h3 className={style.title}>Способ оплаты</h3>
        <div className={style.inputContainer}>
          <Input
            uniqType={"radio"}
            forRadio="Наличными"
            type="radio"
            name="pay"
          />
        </div>
        <div className={style.inputContainer}>
          <Input
            uniqType={"radio"}
            forRadio="Картой курьеру"
            type="radio"
            name="pay"
          />
        </div>
      </div>
      <Button label={"Отправить"} onClick={submit} type={"btnShop"} />
    </div>
  );
};
