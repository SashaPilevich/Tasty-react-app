import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { setLocalItems } from "../../redux/actions/category";
import { TState } from "../../redux/store";
import { Button } from "../Button";
import { Header } from "../Header";
import style from "./style.module.css";

export const MyShoppingList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDark } = useContext(Context);

  const localItems = useSelector(
    (state: TState) => state.categoryReducer.localItems
  );
  const [isEmpty, setIsEmpty] = useState(false);

  let shopArray = [];
  let isList = localStorage.getItem("shopList");
  useEffect(() => {
    if (isList) {
      shopArray = JSON.parse(isList);
      dispatch(setLocalItems(shopArray));
      setIsEmpty(true);
    }
  }, []);

  const clickBuy = () => {
    navigate("/shop");
  };
  const goBack = () => {
    navigate(-1);
  };
  const clickDelete = (ingredient: string) => {
    const newList: string[] | undefined = localItems?.filter((item) => {
      return item !== ingredient;
    });
    dispatch(setLocalItems(newList));
    localStorage.setItem("shopList", JSON.stringify(newList));
    if (newList.length === 0) {
      localStorage.removeItem("shopList");
      setIsEmpty(false);
    }
  };
  return (
    <div className={`${isDark ? style.darkContainer : style.mainContainer}`}>
      <Header />
      <div className={style.btnContainer}>
        <Button label={"Назад"} onClick={goBack} type={"btnBack"} />
      </div>
      <h2 className={style.title}>Мой шоппинг лист</h2>
      {isEmpty ? (
        <div className={style.container}>
          {localItems.map((item, index) => {
            const deleteItem = () => {
              clickDelete(item);
            };
            return (
              <div
                className={`${
                  isDark
                    ? style.darkContainerIngredient
                    : style.containerIngredient
                }`}
                key={index}
              >
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
          <Button label={"Купить"} onClick={clickBuy} type="btnBuy" />
        </div>
      ) : (
        <h3 className={style.emptyList}>Ваш список пуст...</h3>
      )}
    </div>
  );
};
