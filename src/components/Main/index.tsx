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
      <div className={style.titleContainer}>
        <h2 className={style.tastyInner}>TASTY</h2>
        <p className={style.aboutInner}>
          Приложение TASTY позволяет найти самые разнообразные простые, полезные
          и вкусные рецепты,а также вы сможете мгновенно заказать доставку
          необходимых ингредиентов для выбранного блюда.
        </p>
        <div className={style.forBtn}>
          <Button
            label="Готовить"
            onClick={navigateToCategory}
            type="btnMain"
          />
        </div>
      </div>
    </div>
  );
};
