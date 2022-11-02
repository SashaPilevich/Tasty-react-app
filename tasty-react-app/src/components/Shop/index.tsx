import { MouseEvent, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { loadShop } from "../../redux/actions/category";
import { TState } from "../../redux/store";
import { IShop } from "../../types/post";
import { Button } from "../Button";
import { Container } from "../Container";
import { Header } from "../Header";
import style from "./style.module.css";

export const Shop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDark } = useContext(Context);
  const product = useSelector(
    (state: TState) => state.categoryReducer.shopItem
  );

  useEffect(() => {
    dispatch(loadShop() as any);
  }, []);

  const sum = () => {
    let summa = 0;
    product.map((item) => {
      return (summa = summa + item.price);
    });
    return summa.toFixed(2);
  };
  const navigateToDelivery = () => {
    navigate("/delivery");
  };
  return (
    <div>
      <div className={style.fullSum}>
        <p className={`${style.sum} ${isDark ? style.darkItem : style.sum}`}>
          Общая сумма {sum()}
          <span
            className={`${style.sum} ${isDark ? style.darkItem : style.sum}`}
          >
            руб.
          </span>
        </p>
      </div>
      {product ? (
        <div className={style.container}>
          {product.map((item) => {
            return (
              <div className={style.containerItem}>
                <div className={style.productItem}>
                  <img className={style.imgProduct} src={item.image}></img>
                  <h4 className={style.productTitle}>{item.title}</h4>
                  <p className={style.productQuantity}>{item.quantity}</p>
                </div>
                <div className={style.containerPrice}>
                  <p
                    className={`${style.productPrice} ${
                      isDark ? style.darkItem : style.productPrice
                    }`}
                  >
                    {item.price}
                    <span
                      className={`${style.sum} ${
                        isDark ? style.darkItem : style.sum
                      }`}
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
    </div>
  );
};
