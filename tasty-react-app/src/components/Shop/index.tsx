import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import {
  loadShop,
  setShopItems,
  setTotalPrice,
} from "../../redux/actions/category";
import { TState } from "../../redux/store";
import { IShop } from "../../types/post";
import { Button } from "../Button";
import { Count } from "../Count";
import style from "./style.module.css";
const sum = (productsList: IShop[]) => {
  let result = productsList.reduce((summa, item) => {
    return summa + item.price;
  }, 0);
  return result;
};
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
    const newProducts = products.filter((item) => {
      return item.id !== id;
    });
    dispatch(setShopItems(newProducts));
    dispatch(setTotalPrice(sum(newProducts)));
  };
  const increment = (id: number) => {
    console.log(count);
    products.forEach((item) => {
      if (item.id === id) {
        ++item.count;
        setCount(item.count);
        dispatch(setTotalPrice(sum(products)));
      }
    });
  };
  const decrement = (id: number) => {
    products.forEach((item) => {
      if (item.id === id) {
        if (item.count - 1 >= 0) {
          --item.count;
          setCount(item.count);
          dispatch(setTotalPrice(sum(products)));
        } else {
          return false;
        }
      }
    });
  };

  return (
    <>
      <div className={style.forBtnBack}>
        <Button label={"Назад"} onClick={goBack} type="btnBack" />
      </div>
      <div className={style.fullSum}>
        <p className={style.summa}>
          Общая сумма <span className={style.totalPrice}>{totalPrice}</span>
          <span className={style.summa}>руб.</span>
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
                key={item.id}
              >
                <div className={style.forBtnDelete}>
                  <button className={style.deleteBtn} onClick={clickDelete}>
                    <span className={style.delete}></span>
                    <p className={style.deleteText}>Удалить</p>
                  </button>
                </div>
                <div className={style.imageContainer}>
                  <img className={style.imgProduct} src={item.image}></img>
                </div>
                <div className={style.containerPrice}>
                  <h4
                    className={`${
                      isDark ? style.darkProductTitle : style.productTitle
                    }`}
                  >
                    {item.title}{" "}
                  </h4>
                  <p
                    className={`${
                      isDark ? style.darkProductPrice : style.productPrice
                    }`}
                  >
                    {item.price}

                    <span className={`${isDark ? style.darkSum : style.sum}`}>
                      руб.
                    </span>
                  </p>
                  <p
                    className={`${
                      isDark ? style.darkProductQuantity : style.productQuantity
                    }`}
                  >
                    {item.quantity}
                  </p>
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
