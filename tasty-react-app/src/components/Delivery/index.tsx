import { ChangeEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { Input } from "../Input";
import { NotificationManager } from "react-notifications";
import {
  validateAddress,
  validatePhoneNumber,
  validateRequired,
} from "../../utils/validation";
import style from "./style.module.css";
import { useDispatch } from "react-redux";
import { setLocalItems, setShopItems } from "../../redux/actions/category";

export const Delivery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submit = () => {
    NotificationManager.success("Ваш заказ оформлен.Ожидайте звонка менеджера");
    navigate("/category");
    localStorage.removeItem("shopList");
    dispatch(setLocalItems([]));
  };
  const [citySt, setCitySt] = useState("");
  const [houseApartment, setHouseApartment] = useState("");
  const [entranceFloor, setEntranceFloor] = useState("");
  const [date, setDate] = useState("");
  const [telNumber, setTelNumber] = useState("");

  const [cityStError, setCityStError] = useState("");
  const [houseApartmentError, setHouseApartmentError] = useState("");
  const [entranceFloorError, setEntranceFloorError] = useState("");
  const [dateError, setDateError] = useState("");
  const [telNumberError, setTelNumberError] = useState("");

  const handleCityStreet: ChangeEventHandler<HTMLInputElement> = (event) => {
    const error = validateRequired(event.target.value);
    if (error) {
      setCityStError(error);
    } else {
      setCityStError("");
    }
    setCitySt(event.target.value);
  };
  const handleCityBlur = () => {
    const error = validateRequired(citySt);
    setCityStError(error);
  };
  const handleCityFocus = () => {
    setCityStError("");
  };

  const handleHouseApartment: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const error = validateAddress(event.target.value);
    if (error) {
      setHouseApartmentError(error);
    } else {
      setHouseApartmentError("");
    }
    setHouseApartment(event.target.value);
  };
  const handleHouseApartmentBlur = () => {
    const error = validateAddress(houseApartment);
    setHouseApartmentError(error);
  };
  const handleHouseApartmentFocus = () => {
    setHouseApartmentError("");
  };

  const handleEntranceFloor: ChangeEventHandler<HTMLInputElement> = (event) => {
    const error = validateAddress(event.target.value);
    if (error) {
      setEntranceFloorError(error);
    } else {
      setEntranceFloorError("");
    }
    setEntranceFloor(event.target.value);
  };
  const handleEntranceFloorBlur = () => {
    const error = validateAddress(entranceFloor);
    setEntranceFloorError(error);
  };
  const handleEntranceFloorFocus = () => {
    setEntranceFloorError("");
  };

  const handleDate: ChangeEventHandler<HTMLInputElement> = (event) => {
    const error = validateRequired(event.target.value);
    if (error) {
      setDateError(error);
    } else {
      setDateError("");
    }
    setDate(event.target.value);
  };
  const handleDateBlur = () => {
    const error = validateRequired(date);
    setDateError(error);
  };
  const handleDateFocus = () => {
    setDateError("");
  };

  const handleTelNumber: ChangeEventHandler<HTMLInputElement> = (event) => {
    const error = validatePhoneNumber(event.target.value);
    if (error) {
      setTelNumberError(error);
    } else {
      setTelNumberError("");
    }
    setTelNumber(event.target.value);
  };
  const handleTelNumberBlur = () => {
    const error = validatePhoneNumber(telNumber);
    setTelNumberError(error);
  };
  const handleTelNumberFocus = () => {
    setTelNumberError("");
  };
  return (
    <div className={style.container}>
      <div className={style.address}>
        <h3 className={style.title}>Адрес доставки</h3>

        <div className={style.inputContainer}>
          <Input
            uniqType="inputForRegistration"
            label="Город/Улица"
            onChange={handleCityStreet}
            placeholder="город/улица"
            error={cityStError}
            onBlur={handleCityBlur}
            onFocus={handleCityFocus}
          />
        </div>
        <div className={style.inputContainer}>
          <Input
            uniqType="delivery"
            label="Дом/Квартира"
            onChange={handleHouseApartment}
            onFocus={handleHouseApartmentFocus}
            onBlur={handleHouseApartmentBlur}
            error={houseApartmentError}
            placeholder="дом/квартира"
          />
        </div>
        <div className={style.inputContainer}>
          <Input
            uniqType="delivery"
            label="Подъезд/Этаж"
            onChange={handleEntranceFloor}
            placeholder="подъезд/этаж"
            onFocus={handleEntranceFloorFocus}
            onBlur={handleEntranceFloorBlur}
            error={entranceFloorError}
          />
        </div>
        <div className={style.inputContainer}>
          <Input
            uniqType="delivery"
            label="Дата"
            type="date"
            onChange={handleDate}
            onFocus={handleDateFocus}
            onBlur={handleDateBlur}
            error={dateError}
          />
        </div>
        <div className={style.inputContainer}>
          <Input
            uniqType="delivery"
            label="Номер телефона"
            type="tel"
            onChange={handleTelNumber}
            onBlur={handleTelNumberBlur}
            onFocus={handleTelNumberFocus}
            error={telNumberError}
            placeholder="+375xx-xxx-xx-xx"
          />
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
      <Button label={"Отправить"} onClick={submit} type={"btnBuy"} />
    </div>
  );
};
