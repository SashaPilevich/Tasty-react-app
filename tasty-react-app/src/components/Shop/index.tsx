import { MouseEvent, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import {
  loadShop,
  setShopItems,
  setTotalPrice,
} from "../../redux/actions/category";
import { TState } from "../../redux/store";
import { Button } from "../Button";
import { Count } from "../Count";
import style from "./style.module.css";

export const Shop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDark } = useContext(Context);
  const [count, setCount] = useState(1);
  const products = useSelector(
    (state: TState) => state.categoryReducer.shopItems
  );
  const totalPrice = useSelector(
    (state: TState) => state.categoryReducer.totalPrice
  );

  useEffect(() => {
    dispatch(loadShop() as any);
  }, []);

  const navigateToDelivery = () => {
    navigate("/delivery");
  };
  const goBack = () => {
    navigate(-1);
  };
  const deleteItem = (id: number) => {
    const basket = products.filter((item) => {
      return item.id !== id;
    });
    dispatch(setShopItems(basket));
    dispatch(
      setTotalPrice(
        basket.reduce((sum, item) => {
          return sum + item.price * item.count;
        }, 0)
      )
    );
    setCount(1);
  };
  const increment = (id: number) => {
    console.log("hello");
    products.map((item) => {
      if (item.id === id) {
        ++item.count;
        dispatch(
          setTotalPrice(
            products.reduce((sum, item) => {
              return sum + item.price * item.count;
            }, 0)
          )
        );
      }
      setCount(item.count + 1);
    });
  };
  const decrement = (id: number) => {
    if (count !== 0) {
      products.map((item) => {
        if (item.id === id) {
          --item.count;
          dispatch(
            setTotalPrice(
              products.reduce((sum, item) => {
                return sum + item.price * item.count;
              }, 0)
            )
          );
        }
        setCount(item.count - 1);
      });
    }
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
          Общая сумма {totalPrice}
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
            const clickDelete = () => {
              deleteItem(item.id);
            };
            return (
              <div
                className={`${
                  isDark ? style.darkContainerItem : style.containerItem
                }`}
              >
                <div className={style.forBtnDelete}>
                  <Button
                    label={"X"}
                    onClick={clickDelete}
                    type={"btnDelete"}
                  />
                </div>
                <div className={style.imageContainer}>
                  <img className={style.imgProduct} src={item.image}></img>
                </div>
                <div className={style.containerPrice}>
                  <h4 className={style.productTitle}>{item.title} </h4>
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
                  <p className={style.productQuantity}>{item.quantity}</p>
                  <Count
                    count={item.count}
                    id={item.id}
                    increment={increment}
                    decrement={decrement}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      <Button
        label={"Оформить доставку"}
        onClick={navigateToDelivery}
        type="btnBuy"
      />
    </>
  );
};
