import { useContext } from "react";
import { Button } from "../Button";
import { Context } from "../../App";
import style from "./style.module.css";

interface IIngredientForShop {
  ingredient: string;
  onClick: () => void;
}

export const IngredientForShop = (props: IIngredientForShop) => {
  const { isDark } = useContext(Context);

  return (
    <div
      className={`${
        isDark ? style.darkControlIngredient : style.controlIngredient
      }`}
    >
      <p
        className={`${style.itemIngredientsInShop} ${
          isDark ? style.darkItemInShop : style.itemIngredientsInShop
        }`}
      >
        {props.ingredient}
      </p>
      <Button label="X" onClick={props.onClick} type="btnDelete" />
    </div>
  );
};
