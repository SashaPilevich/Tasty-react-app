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
        <div className={style.titleInner}>
          <div className={style.tasty}>
            <h2 className={style.tastyInner}>TASTY</h2>
          </div>
          <div className={style.about}>
            <p className={style.aboutInner}>
              Приложение TASTY позволяет найти самые разнообразные простые,
              полезные и вкусные рецепты,а также вы сможете мгновенно заказать
              доставку необходимых ингредиентов для выбранного блюда.
            </p>
            <Button
              label="Готовить"
              onClick={navigateToCategory}
              type="btnMain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
