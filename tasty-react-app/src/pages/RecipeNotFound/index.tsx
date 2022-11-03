import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import style from "./style.module.css";

export const RecipeNotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className={style.mainContainer}>
        <h3 className={style.titleNotFind}>К сожалению ничего не найдено...</h3>
        <p className={style.textNotFind}>
          Попробуйте найти рецепт из категории
        </p>

        <Button
          label={"Назад"}
          onClick={() => {
            navigate("/category");
          }}
          type={"btnCategory"}
        />
      </div>
    </Container>
  );
};
