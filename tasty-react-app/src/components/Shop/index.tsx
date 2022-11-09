import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { loadShop } from "../../redux/actions/category";
import { TState } from "../../redux/store";
import { Button } from "../Button";
import style from "./style.module.css";

export const Shop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDark } = useContext(Context);
  const products = useSelector(
    (state: TState) => state.categoryReducer.shopItems
  );

  useEffect(() => {
    dispatch(loadShop() as any);
  }, []);

  const sum = () => {
    let result = products.reduce((summa, item) => {
      return summa + item.price;
    }, 0);
    return result.toFixed(2);
  };
  const navigateToDelivery = () => {
    navigate("/delivery");
  };
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className={style.forBtnBack}>
        <Button label={"Назад"} onClick={goBack} type="btnBack" />
      </div>
      <div className={style.fullSum}>
        <p
          className={`${style.summa} ${isDark ? style.darkItem : style.summa}`}
        >
          Общая сумма {sum()}
          <span
            className={`${style.summa} ${
              isDark ? style.darkItem : style.summa
            }`}
          >
            руб.
          </span>
        </p>
      </div>
      {products ? (
        <div className={style.container}>
          {products.map((item) => {
            return (
              <div
                className={`${
                  isDark ? style.darkContainerItem : style.containerItem
                }`}
                key={item.id}
              >
                <div className={style.productItem} key={item.id}>
                  <img
                    className={style.imgProduct}
                    src={item.image}
                    key={item.id}
                  ></img>
                  <h4 className={style.productTitle} key={item.id}>
                    {item.title}{" "}
                  </h4>
                  <p className={style.productQuantity} key={item.id}>
                    {item.quantity}
                  </p>
                </div>
                <div className={style.containerPrice} key={item.id}>
                  <p
                    className={`${style.productPrice} ${
                      isDark ? style.darkItem : style.productPrice
                    }`}
                    key={item.id}
                  >
                    {item.price}
                    <span
                      className={`${style.sum} ${
                        isDark ? style.darkItem : style.sum
                      }`}
                      key={item.id}
                    >
                      руб.
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      <Button
        label={"Оформить доставку"}
        onClick={navigateToDelivery}
        type="btnShop"
      />
    </>
  );
};
