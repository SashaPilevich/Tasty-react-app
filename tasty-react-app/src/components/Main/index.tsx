import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import style from "./style.module.css";

export const Main = () => {
  const navigate = useNavigate();
  const navigateToCategory = () => {
    navigate("/category");
  };
  return (
    <div className={style.container}>
      <h2 className={style.title}>TASTY</h2>
      <p className={style.textAbout}>
        Приложение TASTY позволяет найти самые разнообразные простые, полезные и
        вкусные рецепты,а также вы сможете мгновенно заказать доставку
        необходимых ингредиентов для выбранного блюда.
      </p>
      <Button label="Готовить" onClick={navigateToCategory} type="btnMain" />
    </div>
  );
};
