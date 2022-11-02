import { SetStateAction, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { setLocalItem } from "../../redux/actions/category";
import { TState } from "../../redux/store";
import { Button } from "../Button";
import { Container } from "../Container";
import { Header } from "../Header";
import style from "./style.module.css";

export const MyShoppingList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDark } = useContext(Context);

  const localItem = useSelector(
    (state: TState) => state.categoryReducer.localItem
  );

  let shopArray = [];
  let isList = localStorage.getItem("shopList");

  useEffect(() => {
    if (isList) {
      shopArray = JSON.parse(isList);
      shopArray = shopArray.map((item: string[]) => {
        return item;
      });
      dispatch(setLocalItem(shopArray));
    }
  }, []);

  const clickBuy = () => {
    navigate("/shop");
  };
  const goBack = () => {
    navigate(-1);
  };
  const clickDelete = (ingredient: string) => {
    const newList: string[] | undefined = localItem?.filter((item) => {
      return item !== ingredient;
    });
    dispatch(setLocalItem(newList));
    localStorage.setItem("shopList", JSON.stringify(newList));
  };
  return (
    <Container>
      <Header />
      <div className={style.btnContainer}>
        <Button label={"Back"} onClick={goBack} type={"btnBack"} />
      </div>
      <h2 className={style.title}>My shopping list</h2>
      {localItem.map((item) => {
        const deleteItem = () => {
          clickDelete(item);
        };
        return (
          <div className={style.container}>
            <p
              className={`${style.ingredientsItem} ${
                isDark ? style.darkItem : style.ingredientsItem
              }`}
            >
              {item}
            </p>
            <Button label="X" onClick={deleteItem} type="btnDelete" />
          </div>
        );
      })}
      <Button label={"BUY"} onClick={clickBuy} type="btnShop" />
    </Container>
  );
};
